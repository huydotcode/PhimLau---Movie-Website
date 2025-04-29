import { signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoLogIn } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "../app/firebase";
import { navlink } from "../constants/navlink";
import { useAuth } from "../context/AuthProvider";
import useClickOutSide from "../hooks/useClickOutSide";
import { useDebounce } from "../hooks/useDebounce";
import Icons from "./Icons";
import Loading from "./Loading";
import Button from "./ui/Button";
import { Modal } from "antd";

// Lọc theo thể loại
const categories = [
  { name: "Chính kịch", slug: "chinh-kich" },
  { name: "Hành động", slug: "hanh-dong" },
  { name: "Hài hước", slug: "hai-huoc" },
  { name: "Phiêu lưu", slug: "phieu-luu" },
  { name: "Hình sự", slug: "hinh-su" },
  { name: "Tình cảm", slug: "tinh-cam" },
  { name: "Viễn tưởng", slug: "vien-tuong" },
  { name: "Bí ẩn", slug: "bi-an" },
  { name: "Khoa học", slug: "khoa-hoc" },
  { name: "Kinh dị", slug: "kinh-di" },
];

// Lọc theo quốc gia
const countries = [
  { name: "Việt Nam", slug: "viet-nam" },
  { name: "Hàn Quốc", slug: "han-quoc" },
  { name: "Nhật Bản", slug: "nhat-ban" },
  { name: "Âu Mỹ", slug: "au-my" },
  { name: "Trung Quốc", slug: "trung-quoc" },
  { name: "Anh", slug: "anh" },
  { name: "Pháp", slug: "phap" },
  { name: "Thái Lan", slug: "thai-lan" },
  { name: "Ấn Độ", slug: "an-do" },
];

const navUserItems = displayName => [
  {
    key: "display-name",
    label: <h1 className="p-1 font-bold">Xin chào, {displayName}</h1>,
  },
  {
    key: "divider-1",
    label: <div className="border-t border-1"></div>,
  },
  {
    key: "your-account",
    label: (
      <Button className="w-full hover:text-primary flex justify-start">
        Tài khoản của bạn
      </Button>
    ),
  },
  {
    key: "list-loves",
    label: (
      <Button className="w-full hover:text-primary flex justify-start">
        Yêu thích
      </Button>
    ),
  },
  {
    key: "list-watch-later",
    label: (
      <Button className="w-full hover:text-primary flex justify-start">
        Xem sau
      </Button>
    ),
  },
  {
    key: "divider-2",
    label: <div className="border-t border-1/4"></div>,
  },
  {
    key: "logout",
    label: (
      <Button
        className="hover:text-primary w-full flex justify-start"
        onClick={async () => {
          await signOut(auth);
        }}
      >
        Đăng xuất
      </Button>
    ),
  },
];

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="@container flex justify-between items-center h-[60px] px-4 text-white mx-auto">
      <div className="w-[140px] flex items-center">
        <Link className="w-full h-full text-primary" to="/">
          <img className="object-center" src="/logo.png" alt="Phim New" />
        </Link>
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex justify-center items-center @max-5xl:hidden">
        <ul className="relative flex items-center gap-4">
          {navlink.map((item, index) => {
            if (["Thể loại", "Quốc gia"].includes(item.name)) {
              return (
                <NavItemDropDown
                  key={index}
                  item={item}
                  subItems={item.name == "Thể loại" ? categories : countries}
                />
              );
            }

            return (
              <li
                key={index}
                className={`ml-4 w-full text-sm font-bold hover:text-primary transition-all duration-200 text-nowrap ${item.link === location.pathname ? "text-primary" : ""
                  }`}
              >
                <Link to={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <ul className="flex items-center gap-6">
          <NavbarSearch />

          <NavbarMobile />

          <Button>
            <Icons.Notification className="w-6 h-6" />
          </Button>

          <>
            {user ? (
              <Dropdown
                menu={{ items: navUserItems(user.displayName) }}
                trigger={["click"]}
                placement="bottomRight"
                arrow
                dropdownRender={menu => (
                  <div className="min-w-[200px] rounded-md p-0">
                    {React.cloneElement(menu)}
                  </div>
                )}
              >
                <Button className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.photoURL}
                      alt={user.displayName}
                    />
                  ) : (
                    <Icons.User className="w-6 h-6" />
                  )}
                </Button>
              </Dropdown>
            ) : (
              <NavbarLogin />
            )}
          </>
        </ul>
      </div>
    </div>
  );
};

// NavbarLogin - Modal Login
const NavbarLogin = () => {
  const { handleSubmit, register, formState, setError, reset, watch } = useForm(
    {
      defaultValues: {
        email: "",
        password: "",
        name: "", // Thêm trường "Tên" cho đăng ký
        phone: "", // Thêm trường "Số điện thoại" cho đăng ký
      },
    },
  );
  const [openLogin, setOpenLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const {
    loginWithEmailPassword,
    loginWithGoogle,
    register: registerUser,
    forgotPassword,
  } = useAuth();

  const handleLogin = async data => {
    try {
      const { email, password } = data;
      const result = await loginWithEmailPassword(email, password);

      if (result) {
        setOpenLogin(false);
      }
    } catch (error) {
      setError("root", {
        message: "Đăng nhập thất bại",
      });
      toast.error(error?.message || "Đăng nhập thất bại");
    }
  };

  const handleForgotPassword = async () => {
    const email = watch("email");

    if (email.trim().length == 0) {
      setError("email", {
        message: "Vui lòng nhập email để reset mật khẩu",
      });
      return;
    }

    await forgotPassword(watch("email"));
  };

  const handleSignUp = async data => {
    try {
      const { email, password, name, phone } = data;

      const result = await registerUser({
        email,
        password,
        displayName: name,
        phoneNumber: phone,
        photoURL: "/images/user.png",
      });

      if (result) {
        toast.success("Đăng ký thành công!");
        setOpenLogin(false);
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại!");
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success("Đăng nhập bằng Google thành công!");
      setOpenLogin(false);
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập bằng Google thất bại!");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        onClick={() => setOpenLogin(true)}
        className="bg-transparent text-white hover:text-primary hidden md:flex"
      >
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </Button>

      <Button
        onClick={() => setOpenLogin(true)}
        className="bg-transparent text-white hover:text-primary md:hidden"
      >
        <IoLogIn className="w-8 h-8" />
      </Button>

      <Modal
        centered
        open={openLogin}
        onCancel={() => setOpenLogin(false)}
        footer={false}
        className="bg-foreground rounded-xl p-2"
        motion={false} // Tắt motion
        maskTransitionName="" // Tắt hiệu ứng mờ background
        transitionName="" // Tắt hiệu ứng chính của modal
      >
        <form
          onSubmit={
            isLogin ? handleSubmit(handleLogin) : handleSubmit(handleSignUp)
          }
          className="flex flex-col gap-4 p-2"
        >
          <h1 className="text-3xl font-bold text-center mb-4">
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h1>

          <div>
            <input
              className="w-full p-3 bg-foreground rounded-md outline-none text-white placeholder:text-white"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: "Vui lòng nhập email" },
              })}
            />
            {formState?.errors?.email?.message && (
              <p className="text-primary">
                {formState?.errors?.email?.message}
              </p>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <input
                  className="w-full p-3 bg-foreground rounded-md outline-none text-white placeholder:text-white"
                  type="text"
                  placeholder="Tên"
                  {...register("name", {
                    required: { value: true, message: "Vui lòng nhập tên" },
                    pattern: {
                      value: /^[A-Za-zÀ-ỵ\s.-]+$/,
                      message: "Tên không hợp lệ", // Thông báo nếu không đúng định dạng
                    },
                    maxLength: {
                      message: "Tên quá dài rồi! Đừng troll nữa!!",
                      value: 30,
                    },
                  })}
                />
                {formState?.errors?.name?.message && (
                  <>
                    <p className="text-primary">
                      {formState?.errors?.name?.message}
                    </p>
                  </>
                )}

                {/* Gợi ý cho user */}
                <p className="ml-2 text-secondary">
                  - Không chứa kí tự đặc biệt
                </p>
              </div>

              <div>
                <input
                  className="w-full p-3 bg-foreground rounded-md outline-none text-white placeholder:text-white"
                  type="text"
                  placeholder="Số điện thoại"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    // Thiết kế pattern phone 10 chữ bắt đầu bằng 0
                    pattern: {
                      value: /^0\d{9}$/, // Regex cho số điện thoại
                      message: "Số điện thoại không hợp lệ ",
                    },
                  })}
                />
                {formState?.errors?.phone?.message && (
                  <p className="text-primary">
                    {formState?.errors?.phone?.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <input
              className="w-full p-3 bg-foreground rounded-md outline-none text-white placeholder:text-white"
              type="password"
              placeholder="Mật khẩu"
              {...register(
                "password",
                !isLogin && {
                  required: { value: true, message: "Vui lòng nhập mật khẩu" },
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải lớn hơn 8 kí tự!",
                  },
                },
              )}
            />

            {/* Gợi ý cho user */}

            {formState?.errors?.password?.message && (
              <p className="text-primary">
                {formState?.errors?.password?.message}
              </p>
            )}

            {!isLogin && (
              <p className="ml-2 text-secondary">
                - Độ dài mật khẩu lớn hơn 8 kí tự
              </p>
            )}
          </div>

          <div className="flex justify-end mt-2">
            {isLogin && (
              <p
                className="text-sm text-primary hover:underline cursor-pointer"
                onClick={handleForgotPassword}
              >
                Quên mật khẩu?
              </p>
            )}
          </div>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded-md"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting
              ? isLogin
                ? "Đang đăng nhập..."
                : "Đang đăng ký..."
              : isLogin
                ? "Đăng nhập"
                : "Đăng ký"}
          </Button>

          {formState?.errors?.root?.message && (
            <p className="text-primary">{formState?.errors?.root?.message}</p>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 text-sm">Hoặc</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <Button
            onClick={handleLoginGoogle}
            className="flex items-center justify-center gap-2 bg-white text-black font-semibold p-2 rounded-md"
          >
            <FcGoogle className="text-2xl" />
            Đăng nhập với Google
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            {isLogin ? (
              <>
                Bạn chưa có tài khoản?{" "}
                <span
                  className="text-white font-semibold cursor-pointer hover:underline"
                  onClick={() => {
                    setIsLogin(false);
                    reset();
                  }}
                >
                  Đăng ký
                </span>
              </>
            ) : (
              <>
                Bạn đã có tài khoản?{" "}
                <span
                  className="text-white font-semibold cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập
                </span>
              </>
            )}
          </p>
        </form>
      </Modal>
    </div>
  );
};

const NavbarSearch = () => {
  const [openSearch, setOpenSearch] = useState(false);
  // const [searchResults, setSearchResults] = useState([1, 231, 312]);

  const [searchResults, setSearchResults] = useState([]); //Sang test

  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Sử dụng hook debounce
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = e => {
      console.log(wrapperRef.current.contains(e.target));
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý tìm kiếm phim
  useEffect(() => {
    (async () => {
      if (!debouncedQuery) {
        setSearchResults([]); // Nếu không có từ khóa tìm kiếm, xóa kết quả
        return;
      }

      setIsLoading(true); // Bắt đầu loading

      try {
        const res = await fetch(`/json/movies_lastest.json`);
        const data = await res.json();
        // setSearchResults(data); // Cập nhật state

        //Sang cập nhật ở đây
        const filtered = data.filter(movie =>
          movie.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );
        setSearchResults(filtered);
      } catch (err) {
        console.log(err);
        toast("Có lỗi xảy ra khi tìm kiếm phim!");
      } finally {
        setTimeout(() => {
          setIsLoading(false); // Kết thúc loading sau 1 giây
        }, 1000);
      }
    })();
  }, [debouncedQuery]);





  return (
    <div
      className={`relative flex items-center gap-2 ${openSearch && "px-3 py-2 rounded-xl  bg-black"} transition-all duration-200 z-50`}
      ref={wrapperRef}
    >
      <AnimatePresence>
        {openSearch && (
          <motion.input
            key="search"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            placeholder="Tìm phim..."
            className=" text-white text-sm pl-3 pr-10 outline-none"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            // Sang thêm
            onKeyDown={e => {
              if (e.key === "Enter") {
                navigate(`/tim-kiem?q=${query}`);
                setOpenSearch(false);
              }
            }}
          />
        )}
      </AnimatePresence>

      <Button
        onClick={() => {
          setOpenSearch(s => !s);
        }}
        className="rounded-md transition"
      >
        <Icons.Search className="w-5 h-5" />
      </Button>

      {/* Danh sách phim hiển thị ở đây */}
      {openSearch && (
        <div className="absolute top-full mt-1 rounded-xl left-0 w-64 text-white bg-black shadow-lg max-h-80 overflow-y-auto no-scrollbar">
          {searchResults.length > 0 &&
            !isLoading &&
            searchResults.map(movie => (
              <div
                // key={movie}
                key={movie.slug} // test
                className="px-3 py-2 hover:opacity-85 cursor-pointer flex items-center gap-2"
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/phim/${movie.slug}`);
                  setOpenSearch(false);
                }}
              >
                <div
                  className="w-14 h-14 rounded-md bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${movie.poster_url})`,
                  }}
                ></div>

                <div className="w-full flex flex-col gap-1">
                  <div className="font-semibold text-sm">{movie.name}</div>
                  <div className="text-sm text-gray-500">
                    {movie.origin_name}
                  </div>
                </div>
              </div>
            ))}

          {query.length != 0 && searchResults.length === 0 && !isLoading && (
            <div className="px-3 py-2 text-white text-xs">
              Không tìm thấy phim nào!
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="px-3 py-2 text-sm text-white text-center hover:text-primary cursor-pointer font-bold">
              <Button
                onClick={() => {
                  navigate(`/tim-kiem?q=${query}`);
                  setOpenSearch(false);
                }}
              >
                Xem toàn bộ kết quả
              </Button>
            </div>
          )}

          {isLoading && <Loading isLoading />}
        </div>
      )}
    </div>
  );
};

// Cuộn từ bên trái sang
const NavbarMobile = () => {
  const [openNavMobile, setOpenNavMobile] = useState(false);
  const location = useLocation();

  const wrapperRef = useRef(null);

  // Đóng khi click ra ngoài
  useClickOutSide(wrapperRef, () => {
    setOpenNavMobile(false);
  });

  return (
    <div ref={wrapperRef} className="flex items-center h-full @min-5xl:hidden">
      <Button
        onClick={() => {
          setOpenNavMobile(prev => !prev);
        }}
      >
        <Icons.Menu className="w-8 h-8 hidden @max-5xl:flex items-center gap-4" />
      </Button>

      <AnimatePresence>
        {openNavMobile && (
          <motion.div
            className="fixed top-[60px] left-0 bg-black text-white min-w-[400px] h-screen flex items-center justify-center z-50 @max-5xl:justify-start"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex items-center gap-4 flex-col h-full py-10 @max-5xl:items-start @max-5xl:w-full @max-5xl:gap-0">
              {navlink.map((item, index) => {
                if (["Thể loại", "Quốc gia"].includes(item.name)) {
                  return (
                    <NavItemDropDown
                      key={index}
                      item={item}
                      subItems={
                        item.name == "Thể loại" ? categories : countries
                      }
                      isMobile
                    />
                  );
                }

                return (
                  <li
                    key={index}
                    className={`ml-4 text-xl w-full font-bold hover:text-primary transition-all duration-200 @max-5xl:py-4 @max-5xl:pl-10 @max-5xl:hover:scale-100 cursor-pointer ${item.link === location.pathname ? "text-primary" : ""
                      }`}
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItemDropDown = ({ item, subItems, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const location = useLocation();

  const handleCategorySelect = slug => {
    setIsOpen(false);
    navigate(`/the-loai/${slug}`);
  };

  // Xử lý khi click ra ngoài
  useClickOutSide(wrapperRef, () => {
    setIsOpen(false);
  });

  return (
    <li
      className={`w-full relative ml-4 text-sm font-bold transition-all duration-200 @max-5xl:py-4 cursor-pointer text-nowrap ${isMobile && "text-xl"
        }`}
      ref={wrapperRef}
    >
      <button
        className={`cursor-pointer focus:outline-none hover:text-primary ${location.pathname.includes(item.link) ? "text-primary" : ""} ${isMobile ? "w-full text-left pl-10" : ""
          }`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {item.name}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute ${isMobile
              ? "relative ml-4 w-3/4 left-0 top-0 mt-2 bg-black rounded-none shadow-none"
              : "top-full left-0 mt-2 bg-foreground rounded-md shadow-lg w-[180px]"
              } flex flex-col py-1 overflow-hidden z-50`}
            initial={{ height: 0 }}
            animate={{
              height: "auto",
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {subItems.map(subItem => {
              return (
                <Link
                  key={subItem.slug}
                  to={`${item.link}/${subItem.slug}`}
                  className={`py-2 hover:text-primary ${isMobile ? "pl-10" : "px-4"
                    } ${location.pathname.includes(
                      `${item.link}/${subItem.slug}`,
                    ) && "text-primary"
                    }`}
                  onClick={() => handleCategorySelect(subItem.slug)}
                >
                  {subItem.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Navbar;

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { navlink } from "../constants/navlink";
import useClickOutSide from "../hooks/useClickOutSide";
import { useDebounce } from "../hooks/useDebounce";
import Icons from "./Icons";
import Loading from "./Loading";
import Button from "./ui/Button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // State cho menu "Thể loại"
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false); // State cho menu "Quốc gia"

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

  const handleCategorySelect = (slug) => {
    navigate(`/the-loai/${slug}`);
    setIsCategoryDropdownOpen(false);
  };

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

  const handleCountrySelect = (slug) => {
    navigate(`/quoc-gia/${slug}`);
    setIsCountryDropdownOpen(false);
  };


  return (
    <div className="@container flex justify-between items-center h-[60px] px-4 text-white mx-auto">
      <div className="w-[140px] flex items-center">
        <Link className="w-full h-full text-primary" to="/">
          <img className="object-center" src="/logo.png" alt="Phim New" />
        </Link>
      </div>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex justify-center items-center @max-5xl:hidden">
        <ul className="flex items-center gap-4">
          {navlink.map((item, index) => {
            if (item.name === "Thể loại") {
              return (
                <li
                  key={index}
                  className="relative ml-4 text-sm font-bold hover:text-primary transition-all duration-200 hover:scale-105"
                >
                  <button
                    className="cursor-pointer focus:outline-none"
                    onClick={() => {
                      setIsCategoryDropdownOpen((prev) => !prev);
                      setIsCountryDropdownOpen(false); // Đóng menu "Quốc gia" nếu đang mở
                    }}
                  >
                    Thể loại
                  </button>
                  <AnimatePresence>
                    {isCategoryDropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg z-50 w-[180px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/the-loai/${category.slug}`}
                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCategorySelect(category.slug)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }
            if (item.name === "Quốc gia") {
              return (
                <li
                  key={index}
                  className="relative ml-4 text-sm font-bold hover:text-primary transition-all duration-200 hover:scale-105"
                >
                  <button
                    className="cursor-pointer focus:outline-none"
                    onClick={() => {
                      setIsCountryDropdownOpen((prev) => !prev);
                      setIsCategoryDropdownOpen(false); // Đóng menu "Thể loại" nếu đang mở
                    }}
                  >
                    Quốc gia
                  </button>
                  <AnimatePresence>
                    {isCountryDropdownOpen && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg z-50 w-[180px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {countries.map((country) => (
                          <Link
                            key={country.slug}
                            to={`/quoc-gia/${country.slug}`}
                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCountrySelect(country.slug)}
                          >
                            {country.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={`ml-4 text-sm font-bold hover:text-primary transition-all duration-200 hover:scale-105 ${item.link === location.pathname ? "text-primary" : ""
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

          <Button>
            <Icons.User className="w-6 h-6" />
          </Button>
        </ul>
      </div>
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
            className="fixed top-[60px] left-0 bg-black text-white w-[400px] h-screen flex items-center justify-center z-50 @max-5xl:justify-start"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex items-center gap-4 flex-col h-full py-10 @max-5xl:items-start @max-5xl:gap-8 @max-5xl:w-full">
              {navlink.map((item, index) => (
                <li
                  key={index}
                  className={`ml-4 text-xl font-bold hover:text-primary transition-all duration-200 hover:scale-105 @max-5xl:pl-10 @max-5xl:w-full @max-5xl:hover:scale-100  ${item.link === location.pathname ? "text-primary" : ""
                    }`}
                >
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

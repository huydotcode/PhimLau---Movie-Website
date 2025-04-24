// components/Footer.jsx
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="@container text-white py-10 border-t border-gray-700 bg-gray-900">
      <div className="grid grid-cols-5 @max-md:grid-cols-2 @max-4xl:grid-cols-2 gap-10 px-4 mx-auto max-w-[1400px]">
        {/* Logo + Slogan */}
        <div className="col-span-2">
          <div
            className="w-full h-40 bg-cover bg-center mb-4"
            style={{
              backgroundImage: "url('/logo.svg')",
            }}
          />
          {/* <img src="/logo.svg" alt="Logo" /> */}
          <p className="text-sm text-gray-400 whitespace-break-spaces">
            PhimNew - Xem phim mới nhât và miễn phí. Chúng tôi cung cấp cho bạn
            những bộ phim mới nhất, chất lượng cao và hoàn toàn miễn phí.
          </p>

          <p className="text-sm text-gray-400 whitespace-break-spaces">
            Developed: Ngô Nhựt Huy - Vũ Quốc Thái - Nguyễn Hữu Sang
          </p>
        </div>

        {/* Danh mục */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Danh mục</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <Link to="#" className="hover:text-white">
                Phim thịnh hành
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Phim lẻ
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Phim bộ
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Thể loại
              </Link>
            </li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Chính sách</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <Link to="#" className="hover:text-white">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-primary">
              <FaFacebook size={24} />
            </Link>
            <Link to="#" className="hover:text-primary">
              <FaYoutube size={24} />
            </Link>
            <Link to="#" className="hover:text-primary">
              <FaInstagram size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Dòng cuối */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} PhimNew. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

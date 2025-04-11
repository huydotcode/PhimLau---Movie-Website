// components/Footer.jsx
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="@container text-white py-10 mt-10 border-t border-gray-700 bg-gray-900">
      <div className="container grid grid-cols-5 @max-md:grid-cols-2 @max-4xl:grid-cols-2 gap-10 px-4 mx-auto">
        {/* Logo + Slogan */}
        <div className="col-span-2">
          <img className="w-3/4" src="/logo.svg" alt="Logo" />
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
              <a href="#" className="hover:text-white">
                Phim thịnh hành
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Phim lẻ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Phim bộ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Thể loại
              </a>
            </li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Chính sách</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="hover:text-primary">
              <FaInstagram size={24} />
            </a>
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

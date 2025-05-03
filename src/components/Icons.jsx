import { BiSolidLike } from "react-icons/bi";
import {
  FaChevronDown,
  FaCommentDots,
  FaFilter,
  FaHeart,
  FaPlay,
  FaRegStar,
  FaSearch,
  FaSort,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowUp, IoIosMenu, IoMdReturnLeft } from "react-icons/io";
import { IoClose, IoNotifications, IoSend } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const Icons = {
  Play: ({ className = "" }) => <FaPlay className={className} />,
  Search: ({ className = "" }) => <FaSearch className={className} />,
  User: ({ className = "" }) => <FaUser className={className} />,
  Notification: ({ className = "" }) => (
    <IoNotifications className={className} />
  ),
  Menu: ({ className = "" }) => <IoIosMenu className={className} />,
  ArrowUp: ({ className = "" }) => <IoIosArrowUp className={className} />,
  Comment: ({ className = "" }) => <FaCommentDots className={className} />,
  Like: ({ className = "" }) => <BiSolidLike className={className} />,
  Star: ({ className = "" }) => <FaStar className={className} />,
  RegStar: ({ className = "" }) => <FaRegStar className={className} />,
  Heart: ({ className = "" }) => <FaHeart className={className} />,
  Send: ({ className = "" }) => <IoSend className={className} />,
  ChevronDown: ({ className = "" }) => <FaChevronDown className={className} />,
  Close: ({ className = "" }) => <IoClose className={className} />,
  Logout: ({ className = "" }) => <IoLogOut className={className} />,
  Filter: ({ className = "" }) => <FaFilter className={className} />,
  Return: ({ className = "" }) => <IoMdReturnLeft className={className} />,
  Sort: ({ className = "" }) => <FaSort className={className} />,
};

export default Icons;

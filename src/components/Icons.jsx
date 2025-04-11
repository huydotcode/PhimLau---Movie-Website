import { FaSearch, FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";

const Icons = {
  Search: ({ className }) => <FaSearch className={className} />,
  User: ({ className }) => <FaUser className={className} />,
  Notification: ({ className }) => <IoNotifications className={className} />,
  Menu: ({ className }) => <IoIosMenu className={className} />,
};

export default Icons;

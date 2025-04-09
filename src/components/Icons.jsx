import { FaSearch, FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const Icons = {
  Search: ({ className }) => <FaSearch className={className} />,
  User: ({ className }) => <FaUser className={className} />,
  Notification: ({ className }) => <IoNotifications className={className} />,
};

export default Icons;

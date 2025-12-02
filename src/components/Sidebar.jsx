import {
  FaHome,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaIdBadge,
  FaBullhorn,
  FaEnvelope
} from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineWork } from "react-icons/md";
// import { RiLogoutCircleFill } from "react-icons/ri";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  // const navigate = useNavigate();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) toggleSidebar();
  };

  const navLinks = [
    {
      to: "/dashboard",
      icon: <FaHome className="text-lg" />,
      label: "Dashboard",
    },
    {
      to: "/payment-status",
      icon: <FaMoneyCheckAlt className="text-lg" />,
      label: "Payment Status",
    },
    {
      to: "/documents",
      icon: <FaFileAlt className="text-lg" />,
      label: "Documents",
    },
    {
      to: "/certificates",
      icon: <MdOutlineWork className="text-lg" />,
      label: "Certificates",
    },
    {
      to: "/id-card",
      icon: <FaIdBadge className="text-lg" />,
      label: "ID Card",
    },
    {
      to: "/notice",
      icon: <FaBullhorn className="text-lg" />,
      label: "Notice",
      disabled: true,
    },
    {
      to: "/applications",
      icon: <FaEnvelope className="text-lg" />,
      label: "Support",
      disabled: false,
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <img src={logo} alt="Company Logo" className="h-10 w-10" />
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 
          transform transition-transform duration-300 ease-in-out
          bg-white w-64 h-full fixed top-0 left-0 z-20
          border-r border-gray-200
          flex flex-col
          md:top-0
        `}
      >
        {/* Logo */}
        <div className="p-6 flex justify-center items-center border-b border-gray-200 md:mt-0 mt-16">
          <img src={logo} alt="Company Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map(({ to, icon, label, disabled }) => (
            <Link
              key={to}
              to={disabled ? "#" : to}
              onClick={disabled ? (e) => e.preventDefault() : handleLinkClick}
              className={`
      flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
      ${
        disabled
          ? "text-gray-400 cursor-not-allowed pointer-events-none"
          : location.pathname === to
          ? "bg-gray-100 font-medium text-[#032768]"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}

          {/* Logout */}
          {/* <li
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200 cursor-pointer"
          >
            <RiLogoutCircleFill className="text-lg" />
            <span>Logout</span>
          </li> */}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

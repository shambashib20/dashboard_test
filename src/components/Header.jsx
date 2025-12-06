import { useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  let student = null;
  try {
    const raw = localStorage.getItem("student");
    student = raw ? JSON.parse(raw) : null;
  } catch {
    student = null;
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left side: Logo or Title */}

      {/* Right side: User section */}
      <div className="relative ms-auto">
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${student.name
              ?.split(" ")
              ?.join("+")}`}
            alt="user avatar"
            className="w-9 h-9 rounded-full border cursor-pointer"
          />

          {/* <div className="text-left">
            <p className="text-sm font-medium text-gray-800">Tanvir Shihab</p>
            <p className="text-xs text-gray-500">Student</p>
          </div> */}
          <ChevronDown className="w-4 h-4 text-gray-600 cursor-pointer" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
            <button className="w-full 
            cursor-pointer
            text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"

              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 " /> Profile
            </button>
            <button
              className="w-full 
              cursor-pointer
              text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

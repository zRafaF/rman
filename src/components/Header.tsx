import { FunctionComponent } from "react";
import { Link } from "react-router";
import { Calendar, Home, BookOpen, User, Settings } from "lucide-react";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className="bg-[#273C4E] text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Lab Reservation
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-[#EA0D44] flex items-center">
              <Home className="mr-1" size={18} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              className="hover:text-[#EA0D44] flex items-center"
            >
              <Calendar className="mr-1" size={18} />
              Schedule
            </Link>
          </li>
          <li>
            <Link
              to="/reserve"
              className="hover:text-[#EA0D44] flex items-center"
            >
              <BookOpen className="mr-1" size={18} />
              Reserve
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-[#EA0D44] flex items-center"
            >
              <User className="mr-1" size={18} />
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="hover:text-[#EA0D44] flex items-center"
            >
              <Settings className="mr-1" size={18} />
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

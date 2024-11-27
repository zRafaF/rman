import { FunctionComponent, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Home,
  BookOpen,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/assets/rmanlogoinverted.svg?react"; // SVG import as React component

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#273C4E] text-white px-4 sticky top-0">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center h-full">
          <Logo
            className="h-full w-auto py-1 "
            style={{ maxHeight: "2.5rem" }}
            aria-label="RMAN Logo"
          />
        </Link>
        <div className="py-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Navigation menu */}
          <ul
            className={`md:flex md:space-x-4 items-center ${
              isMenuOpen
                ? "absolute top-16 left-0 w-full bg-[#273C4E] flex flex-col space-y-4 p-4"
                : "hidden"
            } md:static md:flex-row md:space-y-0`}
          >
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
                Agendamento
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
        </div>
      </nav>
    </header>
  );
};

export default Header;

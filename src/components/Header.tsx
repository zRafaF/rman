import { FunctionComponent, useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  BookOpen,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  User,
} from "lucide-react";
import Logo from "@/assets/rmanlogoinverted.svg?react"; // SVG import as React component
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useUserContext } from "@/contexts/UserContext";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, _, logout] = useAuth();
  const userCtx = useUserContext();

  const loggedInHeader = (
    <>
      <li>
        <Link to="/schedule" className="hover:text-[#EA0D44] flex items-center">
          <Calendar className="mr-1" size={18} />
          Agendamento
        </Link>
      </li>
      <li>
        <Link to="/reserve" className="hover:text-[#EA0D44] flex items-center">
          <BookOpen className="mr-1" size={18} />
          Nova Reserva
        </Link>
      </li>
      {userCtx.userDoc?.role === "admin" && (
        <li>
          <Link to="/admin" className="hover:text-[#EA0D44] flex items-center">
            <LayoutDashboard className="mr-1" size={18} />
            Dashboard
          </Link>
        </li>
      )}

      <li>
        <button
          onClick={() => {
            logout()
              .then(() => {
                toast.success("Logout efetuado com sucesso.");
              })
              .catch((error) => {
                console.error("Error logging out:", error);
                toast.error(
                  "Erro ao efetuar logout. Por favor, tente novamente."
                );
              });
          }}
          className="hover:text-[#EA0D44] flex items-center"
        >
          <LogOut className="mr-1" size={18} />
          Sair
        </button>
      </li>
    </>
  );
  const loggedOutHeader = (
    <>
      <li>
        <Link to="/schedule" className="hover:text-[#EA0D44] flex items-center">
          <Calendar className="mr-1" size={18} />
          Agendamento
        </Link>
      </li>
      <li>
        <Link to="/login" className="hover:text-[#EA0D44] flex items-center">
          <User className="mr-1" size={18} />
          Login
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-[#273C4E] text-white px-4 sticky top-0 z-10">
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
          <ul
            className={`md:flex md:space-x-4 items-center ${
              isMenuOpen
                ? "absolute top-16 left-0 w-full bg-[#273C4E] flex flex-col space-y-4 p-4"
                : "hidden"
            } md:static md:flex-row md:space-y-0`}
          >
            {user ? loggedInHeader : loggedOutHeader}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

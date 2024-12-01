import { SiGithub } from "@icons-pack/react-simple-icons";
import { FunctionComponent } from "react";
import { Link } from "react-router";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 md:py-12 mt-auto">
      <div className="flex justify-around flex-col md:flex-row gap-2">
        <div className="mx-auto">
          <p>Criado por Rafael F. Meneses</p>
        </div>
        <div className="mx-auto">
          <p>
            &copy; {new Date().getFullYear()} Rman. Todos os direitos
            reservados.
          </p>
        </div>

        <div className="mx-auto">
          <Link to="https://github.com/zRafaF">
            <SiGithub color="#273C4E" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

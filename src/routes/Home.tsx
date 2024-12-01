import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Wrench,
  Zap,
  Paintbrush,
  Scissors,
  Cog,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router";
import { SiGithub } from "@icons-pack/react-simple-icons";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <div className="text-[#273C4E] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#273C4E]">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-32 px-4 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-[#273C4E] text-center"
        >
          Bem-vindo ao Rman
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8 text-center max-w-2xl text-gray-600"
        >
          Através de nosso Sistema de Reservas de Laboratório reserve seu espaço
          para diversas atividades no laboratório e aproveite ao máximo nossas
          instalações de última geração.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          // Center the buttons on mobile and space them out on larger screens
          className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
        >
          <Link to="/schedule">
            <Button className="bg-[#273C4E] hover:bg-[#1c2d3d]">
              <Calendar className="mr-2" size={18} />
              Ver Agenda
            </Button>
          </Link>
          <Link to="/reserve">
            <Button className="bg-[#EA0D44] hover:bg-[#c70a38]">
              <BookOpen className="mr-2" size={18} />
              Fazer uma Reserva
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl"
        >
          <FeatureCard
            icon={<Zap size={32} />}
            title="Usinagem"
            description="Acesso a ferramentas de usinagem para seus projetos."
          />
          <FeatureCard
            icon={<Wrench size={32} />}
            title="Marcenaria"
            description="Instalações de marcenaria para todas as suas necessidades."
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Soldagem"
            description="Equipamentos de soldagem para trabalho de metais."
          />
          <FeatureCard
            icon={<Paintbrush size={32} />}
            title="Pintura"
            description="Espaço dedicado para pintura e acabamento dos seus projetos."
          />
          <FeatureCard
            icon={<Scissors size={32} />}
            title="Corte a Laser"
            description="Serviços de corte a laser de precisão para diversos materiais."
          />
          <FeatureCard
            icon={<Cog size={32} />}
            title="Router CNC"
            description="Capacidades roteamento CNC para designs complexos."
          />
        </motion.div>
      </div>
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
            <Link to="https://github.com/zRafaF/rman">
              <SiGithub color="#273C4E" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

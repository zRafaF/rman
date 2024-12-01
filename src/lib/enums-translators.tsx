import { ReactNode } from "react";
import { AreasEnum } from "./firebase/schemas/ReservationDocument";
import {
  Bolt,
  CircleHelp,
  Cog,
  Hammer,
  Paintbrush,
  Scissors,
  Zap,
} from "lucide-react";

interface EnumTranslator {
  title: string;
  color: React.ComponentProps<"div">["className"];
  icon: ReactNode;
}

export function translateAreasEnum(area: AreasEnum): EnumTranslator {
  switch (area) {
    case AreasEnum.MACHINING:
      return {
        title: "Usinagem",
        color: "border-blue-700",
        icon: <Bolt size={16} />,
      };
    case AreasEnum.CARPENTRY:
      return {
        title: "Marcenaria",
        color: "border-green-700",
        icon: <Hammer size={16} />,
      };
    case AreasEnum.WELDING:
      return {
        title: "Soldagem",
        color: "border-yellow-700",
        icon: <Zap size={16} />,
      };
    case AreasEnum.PAINTING:
      return {
        title: "Pintura",
        color: "border-red-700",
        icon: <Paintbrush size={16} />,
      };
    case AreasEnum.LASER_CUTTING:
      return {
        title: "Corte a Laser",
        color: "border-purple-700",
        icon: <Scissors size={16} />,
      };
    case AreasEnum.CNC_ROUTER:
      return {
        title: "CNC Router",
        color: "border-indigo-700",
        icon: <Cog size={16} />,
      };
    default:
      return {
        title: "Desconhecido",
        color: "border-gray-700",
        icon: <CircleHelp size={16} />,
      };
  }
}

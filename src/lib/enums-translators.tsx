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
  color: string;
  textColor: string;
  bgColor: string;
  icon: ReactNode;
}

export function translateAreasEnum(area: AreasEnum): EnumTranslator {
  switch (area) {
    case AreasEnum.MACHINING:
      return {
        title: "Usinagem",
        color: "border-blue-500",
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
        icon: <Bolt size={18} />,
      };
    case AreasEnum.CARPENTRY:
      return {
        title: "Marcenaria",
        color: "border-green-500",
        textColor: "text-green-500",
        bgColor: "bg-green-50",
        icon: <Hammer size={18} />,
      };
    case AreasEnum.WELDING:
      return {
        title: "Soldagem",
        color: "border-yellow-500",
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
        icon: <Zap size={18} />,
      };
    case AreasEnum.PAINTING:
      return {
        title: "Pintura",
        color: "border-red-500 ",
        textColor: "text-red-500",
        bgColor: "bg-red-50",
        icon: <Paintbrush size={18} />,
      };
    case AreasEnum.LASER_CUTTING:
      return {
        title: "Corte a Laser",
        color: "border-purple-500",
        textColor: "text-purple-500",
        bgColor: "bg-purple-50",
        icon: <Scissors size={18} />,
      };
    case AreasEnum.CNC_ROUTER:
      return {
        title: "CNC Router",
        color: "border-indigo-500",
        textColor: "text-indigo-500",
        bgColor: "bg-indigo-50",
        icon: <Cog size={18} />,
      };
    default:
      return {
        title: "Desconhecido",
        color: "border-gray-500",
        textColor: "text-gray-500",
        bgColor: "bg-gray-50",
        icon: <CircleHelp size={18} />,
      };
  }
}

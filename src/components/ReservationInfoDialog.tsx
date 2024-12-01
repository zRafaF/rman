"use client";

import { FunctionComponent, useState } from "react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  Ellipsis,
  Mail,
  Phone,
  ShieldCheck,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { translateAreasEnum } from "@/lib/enums-translators";
import { formatDate } from "@/lib/time-helper";
import { formatPhoneNumber } from "react-phone-number-input";
import ReservationDocument, {
  StatusEnum,
} from "@/lib/firebase/schemas/ReservationDocument";
import UserDocument, { UserStatus } from "@/lib/firebase/schemas/UserDocument";
import { deleteReservation } from "@/lib/firebase/reservations";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { RotatingLines } from "react-loader-spinner";

interface ReservationInfoDialogProps {
  reservationPair: {
    reservation: QueryDocumentSnapshot<ReservationDocument, DocumentData>;
    user?: UserDocument;
  };
}

const ReservationInfoDialog: FunctionComponent<ReservationInfoDialogProps> = ({
  reservationPair,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      deleteReservation(reservationPair.reservation.id);
      setIsOpen(false);
    } catch (error) {}

    setIsLoading(false);
  };

  const getStatusColor = (status: StatusEnum) => {
    switch (status) {
      case StatusEnum.PENDING:
        return "bg-yellow-500";
      case StatusEnum.ACCEPTED:
        return "bg-green-500";
      case StatusEnum.REJECTED:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const areaInfo = translateAreasEnum(reservationPair.reservation.data().area);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 p-0">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary text-[#273C4E]">
              Detalhes da Reserva
            </DialogTitle>
            <DialogDescription>
              Visualize e gerencie as informações da reserva
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-6 max-h-[60vh] pr-4">
            <div className="space-y-6">
              <motion.div
                className={`border-2 ${areaInfo.color} rounded-lg p-4 ${areaInfo.bgColor} ${areaInfo.textColor}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className={`font-semibold text-lg ${areaInfo.color} ${areaInfo.textColor}`}
                  >
                    {areaInfo.title}
                  </h4>
                  <div className={`p-2 rounded-full ${areaInfo.bgColor}`}>
                    {areaInfo.icon}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <p className="text-sm col-span-2">
                    <span className="font-medium">ID:</span>{" "}
                    {reservationPair.reservation.id}
                  </p>
                  <p className="text-sm flex items-center justify-self-end">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>
                      {formatDate(
                        reservationPair.reservation
                          .data()
                          .reservationDate.toDate(),
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </p>
                  <p className="text-sm flex items-center col-span-2">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {format(
                        reservationPair.reservation.data().startTime.toDate(),
                        "p"
                      )}{" "}
                      -{" "}
                      {format(
                        reservationPair.reservation.data().endTime.toDate(),
                        "p"
                      )}
                    </span>
                  </p>
                  <Badge
                    className={`${getStatusColor(
                      reservationPair.reservation.data().status
                    )} text-white justify-self-end`}
                  >
                    {reservationPair.reservation.data().status}
                  </Badge>
                </div>

                <hr className={`${areaInfo.color} border-opacity-20 my-2`} />

                <h5
                  className={`font-semibold text-sm ${areaInfo.color} ${areaInfo.textColor}`}
                >
                  Utilizador
                </h5>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <p className="text-sm col-span-1 flex align-middle">
                    <User className="mr-1 mt-1 h-4 w-4 flex" />
                    {reservationPair.reservation.data().name}
                  </p>
                  <p className="text-sm col-span-1 flex align-middle justify-self-end">
                    <Phone className="mr-1 mt-1 h-4 w-4 flex" />
                    {formatPhoneNumber(
                      reservationPair.reservation.data().phone
                    )}
                  </p>
                  <p className="text-sm col-span-2 flex align-middle">
                    <Mail className="mr-1 mt-1 h-4 w-4 flex" />
                    {reservationPair.reservation.data().email}
                  </p>
                </div>
              </motion.div>
              {reservationPair.user && (
                <motion.div
                  className="bg-white rounded-lg shadow-md p-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="mb-4">
                    <div className="flex items-center mb-2 text-[#273C4E]">
                      <h4 className="font-semibold text-lg">
                        {reservationPair.user.name}
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[#273C4E]">
                      <p className="text-sm col-span-2 flex align-middle">
                        <Mail className="mr-1 mt-1 h-4 w-4 flex" />
                        {reservationPair.user?.email}
                      </p>
                      <p className="text-sm col-span-1 flex align-middle justify-self-end">
                        <ShieldCheck className="mr-1 mt-1 h-4 w-4 flex" />
                        {reservationPair.user?.role}
                      </p>
                      <p className="text-sm col-span-2 flex align-middle ">
                        <Phone className="mr-1 mt-1 h-4 w-4 flex" />
                        {formatPhoneNumber(reservationPair.user?.phone)}
                      </p>
                      <div className="text-sm col-span-1 justify-self-end">
                        <Badge
                          className={`${
                            reservationPair.user?.status === UserStatus.ACTIVE
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {reservationPair.user?.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="mt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RotatingLines
                        ariaLabel="chat-loading"
                        strokeColor="white"
                      />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir Reserva
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso excluirá
                    permanentemente a reserva.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationInfoDialog;

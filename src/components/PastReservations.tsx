import { FunctionComponent, useMemo } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UseQueryResult } from "@tanstack/react-query";
import ReservationDocument from "@/lib/firebase/schemas/ReservationDocument";
import { translateAreasEnum } from "@/lib/enums-translators";
import { formatReservationDate } from "@/lib/time-helper";
import UserDocument from "@/lib/firebase/schemas/UserDocument";
import ReservationInfoDialog from "./ReservationInfoDialog";
import { QuerySnapshot } from "firebase/firestore";

interface PastReservationsProps extends React.HTMLAttributes<HTMLDivElement> {
  reservations: UseQueryResult<QuerySnapshot<ReservationDocument>, Error>;
  users: UseQueryResult<UserDocument[], Error>;
}

const PastReservations: FunctionComponent<PastReservationsProps> = ({
  className,
  reservations,
  users,
}) => {
  const concludedReservations = useMemo(
    () =>
      reservations.data?.docs.filter(
        (r) => r.data().endTime.toDate() < new Date()
      ),
    [reservations.data]
  );

  const findUser = (uid: string) => {
    return users.data?.find((user) => user.uid === uid);
  };

  const pairedReservations = useMemo(() => {
    return concludedReservations?.map((reservation) => ({
      reservation: reservation,
      user: findUser(reservation.data().uid),
    }));
  }, [concludedReservations]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Reservas Concluídas</CardTitle>
        <CardDescription>Ver histórico completo de reservas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Mais</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pairedReservations?.map((pair) => (
                <TableRow key={`reservation-${pair.reservation.id}`}>
                  <TableCell>
                    {pair.user?.name ??
                      `${pair.reservation.data().name} [visitante]`}
                  </TableCell>
                  <TableCell>
                    {translateAreasEnum(pair.reservation.data().area).title}
                  </TableCell>
                  <TableCell>
                    {formatReservationDate(
                      pair.reservation.data().reservationDate.toDate(),
                      pair.reservation.data().startTime.toDate(),
                      pair.reservation.data().endTime.toDate()
                    )}
                  </TableCell>
                  <TableCell>
                    <ReservationInfoDialog reservationPair={pair} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PastReservations;

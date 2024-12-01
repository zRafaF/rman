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
import ReservationDocument from "@/lib/firebase/schemas/ReservationDocument";
import { UseQueryResult } from "@tanstack/react-query";
import { formatReservationDate } from "@/lib/time-helper";
import { translateAreasEnum } from "@/lib/enums-translators";
import UserDocument from "@/lib/firebase/schemas/UserDocument";
import ReservationInfoDialog from "./ReservationInfoDialog";
import { QuerySnapshot } from "firebase/firestore";

interface CurrentReservationsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reservations: UseQueryResult<QuerySnapshot<ReservationDocument>, Error>;
  users: UseQueryResult<UserDocument[], Error>;
}

const CurrentReservations: FunctionComponent<CurrentReservationsProps> = ({
  className,
  reservations,
  users,
}) => {
  const openReservations = useMemo(
    () =>
      reservations.data?.docs.filter(
        (r) => r.data().endTime.toDate() >= new Date()
      ),
    [reservations.data]
  );
  const findUser = (uid: string) => {
    return users.data?.find((user) => user.uid === uid);
  };

  const pairedReservations = useMemo(() => {
    return openReservations?.map((reservation) => ({
      reservation: reservation,
      user: findUser(reservation.data().uid),
    }));
  }, [openReservations]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Reservas Abertas</CardTitle>
        <CardDescription>
          Gerenciar reservas pendentes e futuras
        </CardDescription>
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
                  <TableCell>{pair.user?.name}</TableCell>
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

export default CurrentReservations;

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

interface PastReservationsProps extends React.HTMLAttributes<HTMLDivElement> {
  reservations: UseQueryResult<ReservationDocument[], Error>;
  users: UseQueryResult<UserDocument[], Error>;
}

const PastReservations: FunctionComponent<PastReservationsProps> = ({
  className,
  reservations,
  users,
}) => {
  const concludedReservations = useMemo(
    () => reservations.data?.filter((r) => r.endTime < new Date()),
    [reservations.data]
  );

  const findCompanyName = (uid: string) => {
    return users.data?.find((user) => user.uid === uid)?.name;
  };

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
              {concludedReservations?.map((reservation) => (
                <TableRow
                  key={`reservation-${reservation.uid}-${reservation.startTime}-${reservation.reservationDate}`}
                >
                  <TableCell>{findCompanyName(reservation.uid)}</TableCell>
                  <TableCell>
                    {translateAreasEnum(reservation.area).title}
                  </TableCell>
                  <TableCell>
                    {formatReservationDate(
                      reservation.reservationDate,
                      reservation.startTime,
                      reservation.endTime
                    )}
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

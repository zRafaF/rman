import { FunctionComponent, useMemo } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";
import ReservationDocument from "@/lib/firebase/schemas/ReservationDocument";
import { UseQueryResult } from "@tanstack/react-query";
import { formatReservationDate } from "@/lib/time-helper";
import { formatPhoneNumber } from "react-phone-number-input";
import { translateAreasEnum } from "@/lib/enums-translators";
import UserDocument from "@/lib/firebase/schemas/UserDocument";

interface CurrentReservationsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reservations: UseQueryResult<ReservationDocument[], Error>;
  users: UseQueryResult<UserDocument[], Error>;
}

const CurrentReservations: FunctionComponent<CurrentReservationsProps> = ({
  className,
  reservations,
  users,
}) => {
  const openReservations = useMemo(
    () => reservations.data?.filter((r) => r.endTime >= new Date()),
    [reservations.data]
  );

  const findCompanyName = (uid: string) => {
    return users.data?.find((user) => user.uid === uid)?.name;
  };

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
                <TableHead>Nome do Utilizador</TableHead>
                <TableHead>Telefone Utilizador</TableHead>
                <TableHead>Data e Hora</TableHead>
                <TableHead>Mais</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openReservations?.map((reservation) => (
                <TableRow
                  key={`reservation-${reservation.uid}-${reservation.startTime}-${reservation.reservationDate}`}
                >
                  <TableCell>{findCompanyName(reservation.uid)}</TableCell>
                  <TableCell>
                    {translateAreasEnum(reservation.area).title}
                  </TableCell>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{formatPhoneNumber(reservation.phone)}</TableCell>
                  <TableCell>
                    {formatReservationDate(
                      reservation.reservationDate,
                      reservation.startTime,
                      reservation.endTime
                    )}
                  </TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        Mais Informações
                      </PopoverContent>
                    </Popover>
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

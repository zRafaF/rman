import { FunctionComponent } from "react";

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

const reservations = [
  {
    id: 1,
    companyName: "Acme Corp",
    area: "Machining",
    date: "2023-05-15",
    startTime: "09:00",
    endTime: "11:00",
    status: "Completed",
  },
  {
    id: 2,
    companyName: "TechCo",
    area: "Welding",
    date: "2023-05-16",
    startTime: "14:00",
    endTime: "16:00",
    status: "Pending",
  },
  {
    id: 3,
    companyName: "Acme Corp",
    area: "Laser Cutting",
    date: "2023-05-17",
    startTime: "10:00",
    endTime: "12:00",
    status: "Accepted",
  },
  {
    id: 4,
    companyName: "TechCo",
    area: "CNC Router",
    date: "2023-05-18",
    startTime: "13:00",
    endTime: "15:00",
    status: "Rejected",
  },
  {
    id: 5,
    companyName: "Innovate Inc",
    area: "Painting",
    date: "2023-05-19",
    startTime: "11:00",
    endTime: "13:00",
    status: "Pending",
  },
  {
    id: 6,
    companyName: "Future Systems",
    area: "Carpentry",
    date: "2023-05-20",
    startTime: "15:00",
    endTime: "17:00",
    status: "Accepted",
  },
];

interface PastReservationsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PastReservations: FunctionComponent<PastReservationsProps> = ({
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Reservas Anteriores</CardTitle>
        <CardDescription>Ver histórico completo de reservas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Data e hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.companyName}</TableCell>
                  <TableCell>{reservation.area}</TableCell>
                  <TableCell>{`${reservation.date} ${reservation.startTime}-${reservation.endTime}`}</TableCell>
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

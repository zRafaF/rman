import { FunctionComponent } from "react";
import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";

interface CurrentReservationsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CurrentReservations: FunctionComponent<CurrentReservationsProps> = ({
  className,
}) => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      companyName: "Acme Corp",
      area: "Machining",
      date: "2023-05-15",
      startTime: "09:00",
      endTime: "11:00",
      status: "Completed",
      requesterName: "John Doe",
      requesterPhone: "123-456-7890",
    },
    {
      id: 2,
      companyName: "TechCo",
      area: "Welding",
      date: "27-11-2024",
      startTime: "14:00",
      endTime: "16:00",
      status: "Pending",
      requesterName: "Jane Smith",
      requesterPhone: "234-567-8901",
    },
    {
      id: 3,
      companyName: "Acme Corp",
      area: "Laser Cutting",
      date: "2023-05-17",
      startTime: "10:00",
      endTime: "12:00",
      status: "Accepted",
      requesterName: "Alice Brown",
      requesterPhone: "345-678-9012",
    },
    {
      id: 4,
      companyName: "TechCo",
      area: "CNC Router",
      date: "2023-05-18",
      startTime: "13:00",
      endTime: "15:00",
      status: "Rejected",
      requesterName: "Bob White",
      requesterPhone: "456-789-0123",
    },
    {
      id: 5,
      companyName: "Innovate Inc",
      area: "Painting",
      date: "2023-05-19",
      startTime: "11:00",
      endTime: "13:00",
      status: "Pending",
      requesterName: "Charlie Green",
      requesterPhone: "567-890-1234",
    },
    {
      id: 6,
      companyName: "Future Systems",
      area: "Carpentry",
      date: "2023-05-20",
      startTime: "15:00",
      endTime: "17:00",
      status: "Accepted",
      requesterName: "Eve Black",
      requesterPhone: "678-901-2345",
    },
  ]);

  const handleReservationStatus = (
    id: number,
    status: "Accepted" | "Rejected" | "Completed"
  ) => {
    setReservations(
      reservations.map((res) => (res.id === id ? { ...res, status } : res))
    );
  };

  const currentReservations = reservations.filter(
    (r) => r.status !== "Completed"
  );

  const formatDate = (date: string) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const formattedDate = new Date(date);

    if (formattedDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (formattedDate.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Current Reservations</CardTitle>
        <CardDescription>
          Manage pending and upcoming reservations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.companyName}</TableCell>
                  <TableCell>{reservation.area}</TableCell>
                  <TableCell>{reservation.requesterName}</TableCell>
                  <TableCell>{reservation.requesterPhone}</TableCell>
                  <TableCell>{formatDate(reservation.date)}</TableCell>
                  <TableCell>{`${reservation.startTime} - ${reservation.endTime}`}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        reservation.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : reservation.status === "Accepted"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                        {reservation.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() =>
                                handleReservationStatus(
                                  reservation.id,
                                  "Accepted"
                                )
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() =>
                                handleReservationStatus(
                                  reservation.id,
                                  "Rejected"
                                )
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {reservation.status === "Accepted" && (
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() =>
                              handleReservationStatus(
                                reservation.id,
                                "Completed"
                              )
                            }
                          >
                            Mark Completed
                          </Button>
                        )}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CurrentReservations;

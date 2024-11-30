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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, CalendarIcon, Clock, MoreHorizontal } from "lucide-react";
import AddUserDialog from "@/components/AddUserDialog";
import CurrentReservations from "@/components/CurrentReservations";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

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

export default function AdminPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      companyName: "Acme Corp",
      email: "acme@example.com",
      phone: "(11)99999-9999",
    },
    {
      id: 2,
      companyName: "TechCo",
      email: "techco@example.com",
      phone: "(22)88888-8888",
    },
    {
      id: 3,
      companyName: "Innovate Inc",
      email: "innovate@example.com",
      phone: "(33)77777-7777",
    },
    {
      id: 4,
      companyName: "Future Systems",
      email: "future@example.com",
      phone: "(44)66666-6666",
    },
  ]);

  const [user, loading] = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/not-authenticated?redirect_to=/admin", {
      replace: true,
    });
    return <></>;
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const chartData = [
    { name: "Machining", value: 4 },
    { name: "Carpentry", value: 3 },
    { name: "Welding", value: 2 },
    { name: "Painting", value: 2 },
    { name: "Laser Cutting", value: 5 },
    { name: "CNC Router", value: 3 },
  ];
  const pastReservations = reservations.filter((r) => r.status === "Completed");

  return (
    <div className=" bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#273C4E]">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Reservations by Area</CardTitle>
              <CardDescription>
                Overview of reservations for each laboratory area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#273C4E" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-6 flex flex-row md:flex-col justify-between gap-3 overflow-auto">
            <Card className="w-full h-full !m-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card className="w-full h-full !m-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Reservations
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "Pending").length}
                </div>
              </CardContent>
            </Card>
            <Card className="w-full h-full !m-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Reservations
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reservations.filter((r) => r.status === "Accepted").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <CurrentReservations className="md:col-span-3 lg:col-span-4 overflow-auto" />
          <Card className="md:col-span-3 lg:col-span-2 overflow-auto">
            <CardHeader className="flex sm:flex-row items-center justify-between ">
              <div>
                <CardTitle>Gerenciar Empresas</CardTitle>
                <CardDescription>Adicione e gerencie empresas</CardDescription>
              </div>
              <AddUserDialog />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da empresa</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.companyName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-40">
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                Editar
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-destructive"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Deletar
                              </Button>
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
          <Card className="md:col-span-3 lg:col-span-2 overflow-auto">
            <CardHeader>
              <CardTitle>Past Reservations</CardTitle>
              <CardDescription>View completed reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastReservations.map((reservation) => (
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
        </div>
      </div>
    </div>
  );
}

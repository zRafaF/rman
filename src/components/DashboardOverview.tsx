import { useQuery } from "@tanstack/react-query";
import { FunctionComponent } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, CalendarIcon, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllActiveUsers } from "@/lib/firebase/users";

const chartData = [
  { name: "Machining", value: 4 },
  { name: "Carpentry", value: 3 },
  { name: "Welding", value: 2 },
  { name: "Painting", value: 2 },
  { name: "Laser Cutting", value: 5 },
  { name: "CNC Router", value: 3 },
];

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

interface DashboardOverviewProps extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardOverview: FunctionComponent<DashboardOverviewProps> = ({
  className,
}) => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllActiveUsers(),
  });

  return (
    <>
      <Card className={className}>
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
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.isLoading ? (
                <Skeleton className="w-20 h-6" />
              ) : users.isSuccess ? (
                users.data.length
              ) : (
                "ERRO"
              )}
            </div>
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
    </>
  );
};

export default DashboardOverview;

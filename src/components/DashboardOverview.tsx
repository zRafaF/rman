import { UseQueryResult } from "@tanstack/react-query";
import { FunctionComponent, useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, CalendarIcon, CircleCheckBig } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ReservationDocument, {
  AreasEnum,
} from "@/lib/firebase/schemas/ReservationDocument";
import UserDocument from "@/lib/firebase/schemas/UserDocument";

interface DashboardOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UseQueryResult<UserDocument[], Error>;
  reservations: UseQueryResult<ReservationDocument[], Error>;
}

const DashboardOverview: FunctionComponent<DashboardOverviewProps> = ({
  className,
  users,
  reservations,
}) => {
  const chartData = useMemo(
    () => [
      {
        name: "Carpintaria",
        value: reservations.data?.filter((r) => r.area === AreasEnum.CARPENTRY)
          .length,
      },
      {
        name: "CNC Router",
        value: reservations.data?.filter((r) => r.area === AreasEnum.CNC_ROUTER)
          .length,
      },
      {
        name: "Corte a laser",
        value: reservations.data?.filter(
          (r) => r.area === AreasEnum.LASER_CUTTING
        ).length,
      },
      {
        name: "Usinagem",
        value: reservations.data?.filter((r) => r.area === AreasEnum.MACHINING)
          .length,
      },
      {
        name: "Pintura",
        value: reservations.data?.filter((r) => r.area === AreasEnum.PAINTING)
          .length,
      },
      {
        name: "Solda",
        value: reservations.data?.filter((r) => r.area === AreasEnum.WELDING)
          .length,
      },
    ],
    [reservations.data]
  );

  const numberOfOpenReservations = useMemo(
    () => reservations.data?.filter((r) => r.endTime >= new Date()).length,
    [reservations.data]
  );

  const numberOfCompletedReservations = useMemo(
    () => reservations.data?.filter((r) => r.endTime < new Date()).length,
    [reservations.data]
  );

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle>Reservas por Area</CardTitle>
          <CardDescription>
            Visão geral das reservas para cada área de laboratório
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
              Reservas Abertas
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfOpenReservations}</div>
          </CardContent>
        </Card>
        <Card className="w-full h-full !m-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Concluídas
            </CardTitle>
            <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {numberOfCompletedReservations}
            </div>
          </CardContent>
        </Card>
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
      </div>
    </>
  );
};

export default DashboardOverview;

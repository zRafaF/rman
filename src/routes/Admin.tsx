import CurrentReservations from "@/components/CurrentReservations";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useUserContext } from "@/contexts/UserContext";
import ManageUsers from "@/components/ManageUsers";
import DashboardOverview from "@/components/DashboardOverview";
import PastReservations from "@/components/PastReservations";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getAllActiveUsers } from "@/lib/firebase/users";
import { getAllReservations } from "@/lib/firebase/reservations";

export default function AdminPage() {
  const [user, loading] = useAuth();
  const navigate = useNavigate();
  const userCtx = useUserContext();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllActiveUsers(),
  });
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => await getAllReservations(),

    initialData: [],
  });

  if (loading || userCtx.loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/not-authenticated?redirect_to=/admin", {
      replace: true,
    });
    return <></>;
  }

  if (userCtx.userDoc?.role !== "admin") {
    navigate("/not-authorized", {
      replace: true,
    });
    return <></>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto space-y-8 py-16">
        <h1 className="text-4xl font-bold text-[#273C4E]">
          Olá {userCtx.userDoc?.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DashboardOverview
            className="md:col-span-2 lg:col-span-3"
            users={users}
            reservations={reservations}
          />

          <CurrentReservations
            className="md:col-span-3 lg:col-span-4 overflow-auto"
            users={users}
            reservations={reservations}
          />
          <ManageUsers
            className="md:col-span-3 lg:col-span-2 overflow-auto"
            users={users}
          />
          <PastReservations
            className="md:col-span-3 lg:col-span-2 overflow-auto"
            users={users}
            reservations={reservations}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

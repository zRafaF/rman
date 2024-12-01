import CurrentReservations from "@/components/CurrentReservations";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useUserContext } from "@/contexts/UserContext";
import ManageUsers from "@/components/ManageUsers";
import DashboardOverview from "@/components/DashboardOverview";
import PastReservations from "@/components/PastReservations";

export default function AdminPage() {
  const [user, loading] = useAuth();
  const navigate = useNavigate();
  const userCtx = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/not-authenticated?redirect_to=/admin", {
      replace: true,
    });
    return <></>;
  }

  return (
    <div className=" bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#273C4E]">
          Rman Dashboard, olá {userCtx.userDoc?.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <DashboardOverview className="md:col-span-2 lg:col-span-3" />

          <CurrentReservations className="md:col-span-3 lg:col-span-4 overflow-auto" />
          <ManageUsers className="md:col-span-3 lg:col-span-2 overflow-auto" />
          <PastReservations className="md:col-span-3 lg:col-span-2 overflow-auto" />
        </div>
      </div>
    </div>
  );
}

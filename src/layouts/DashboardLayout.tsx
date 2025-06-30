import AdminDashboard from "@/components/dashboard/AdminDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import VendorDashboard from "@/components/dashboard/VendorDashboard";
import { useCurrentUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hook";
import { TCurrentUser } from "@/types/commonTypes";

const DashboardLayout = () => {
  const userInfo = useAppSelector(useCurrentUser);
  const { role } = userInfo as TCurrentUser;

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "vendor") {
    return <VendorDashboard />;
  } else if (role === "customer") {
    return <CustomerDashboard />;
  }
};

export default DashboardLayout;

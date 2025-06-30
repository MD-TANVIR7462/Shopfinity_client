import Footer from "@/components/common/Footer";
import Topbar from "@/components/common/Topbar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;

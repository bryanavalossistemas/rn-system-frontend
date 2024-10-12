import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../public/components/Footer";

export default function PublicLayout() {
  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <Outlet />
      <Toaster position="bottom-center" richColors />
      <Footer />
    </div>
  );
}

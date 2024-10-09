import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/public/PublicLayout";
import MainView from "@/views/public/MainView";

import AdminLayout from "@/layouts/admin/AdminLayout";
import VistaCategorias from "@/views/admin/VistaCategorias";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<MainView />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/categorias" element={<VistaCategorias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

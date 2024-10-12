import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/public/PublicLayout";
import MainView from "@/views/public/MainView";

import AdminLayout from "@/layouts/admin/AdminLayout";
import VistaDashboard from "@/views/admin/dashboard/VistaDashboard";
import VistaVendedores from "@/views/admin/vendedores/VistaVendedores";
import VistaClientes from "@/views/admin/clientes/VistaClientes";
import VistaProductos from "@/views/admin/productos/VistaProductos";
import VistaCategorias from "@/views/admin/categorias/VistaCategorias";
import VistaProveedores from "@/views/admin/proveedores/VistaProveedores";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<MainView />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/administrador/dashboard" element={<VistaDashboard />} />
          <Route
            path="/administrador/vendedores"
            element={<VistaVendedores />}
          />
          <Route path="/administrador/clientes" element={<VistaClientes />} />
          <Route path="/administrador/productos" element={<VistaProductos />} />
          <Route
            path="/administrador/categorias"
            element={<VistaCategorias />}
          />
          <Route
            path="/administrador/proveedores"
            element={<VistaProveedores />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

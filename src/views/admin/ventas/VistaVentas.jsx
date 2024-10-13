import ListaDeProductos from "./components/ListaDeProductos";
import { Card } from "@/components/ui/card";
import apiProductos from "@/api/Productos";
import apiClientes from "@/api/Clientes";
import { useEffect, useState } from "react";
import BarraDeBusqueda from "./components/BarraDeBusqueda";
import CarritoVenta from "./components/CarritoVenta";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "nombre",
  },
  {
    accessorKey: "imagenProducto",
  },
  {
    accessorKey: "precioVenta",
  },
];

export default function VistaVentas() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });
  const [columnFilters, setColumnFilters] = useState([]);

  const tabla = useReactTable({
    data: productos,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnFilters,
    },
  });

  async function obtenerClientes() {
    setClientes(await apiClientes.obtenerTodosLosClientes());
  }

  async function obtenerProductos() {
    setProductos(await apiProductos.obtenerTodosLosProductos());
  }

  useEffect(() => {
    obtenerProductos();
    obtenerClientes();
  }, []);

  return (
    <div className="flex-1 flex py-1 pl-1 sm:p-2 gap-x-2">
      <Card className="basis-4/4 pr-1 p-1 sm:p-2 rounded-md sm:basis-3/4 flex flex-col gap-y-1 sm:gap-y-2">
        <BarraDeBusqueda tabla={tabla} />
        <ListaDeProductos tabla={tabla} />
      </Card>
      <div className="sm:basis-1/4">
        <CarritoVenta clientes={clientes} />
      </div>
    </div>
  );
}

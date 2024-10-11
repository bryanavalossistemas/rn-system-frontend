import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import BotonEditar from "./components/BotonEditar";
import BotonEliminar from "./components/BotonEliminar";
import { Search } from "lucide-react";
import BotonCrear from "./components/BotonCrear";
import apiProductos from "@/api/Productos";
import apiCategorias from "@/api/Categorias";
import apiMarcas from "@/api/Marcas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function VistaProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "imagenProducto",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="flex max-w-20">
          <img
            className="object-contain object-center rounded-sm"
            src={row.getValue("imagenProducto")}
            alt="imagen"
          />
        </div>
      ),
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => row.getValue("nombre"),
    },
    {
      accessorKey: "categoria",
      header: "Categoría",
      cell: ({ row }) => row.getValue("categoria"),
    },
    {
      accessorKey: "marca",
      header: "Marca",
      cell: ({ row }) => row.getValue("marca"),
    },
    {
      accessorKey: "precioCosto",
      header: "Precio Costo",
      cell: ({ row }) => row.getValue("precioCosto"),
    },
    {
      accessorKey: "precioVenta",
      header: "Precio Venta",
      cell: ({ row }) => row.getValue("precioVenta"),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.getValue("stock"),
    },
    {
      id: "actions",
      header: () => {
        return <span className="flex justify-end"></span>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-1 justify-end">
            <div className="hidden sm:block">
              <BotonEditar
                producto={row.original}
                categorias={categorias}
                marcas={marcas}
                obtenerProductos={obtenerProductos}
              />
            </div>
            <BotonEliminar
              productoId={row.getValue("id")}
              obtenerProductos={obtenerProductos}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: productos,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
  });

  async function obtenerProductos() {
    setProductos(await apiProductos.obtenerTodosLosProductos());
  }

  async function obtenerCategorias() {
    setCategorias(await apiCategorias.obtenerTodasLasCategorias());
  }

  async function obtenerMarcas() {
    setMarcas(await apiMarcas.obtenerTodasLasMarcas());
  }

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
    obtenerMarcas();
  }, []);

  return (
    <main className="flex-1 flex flex-col gap-y-1 sm:gap-y-4 p-1 sm:p-2">
      <Heading />
      <div className="flex gap-x-8">
        <div className="flex-grow flex flex-col gap-y-4">
          <div className="flex flex-col-reverse gap-y-1 sm:flex-row sm:justify-between sm:gap-y-0 sm:gap-x-1">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  type="search"
                  placeholder="Buscar producto"
                  onChange={(event) =>
                    table.setGlobalFilter(event.target.value)
                  }
                  value={table.getState().globalFilter ?? ""}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <BotonCrear
                obtenerProductos={obtenerProductos}
                categorias={categorias}
                marcas={marcas}
              />
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-y-3">
            <div className="flex-1 bg-white">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell className="font-medium" key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No hay resultados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end gap-x-4">
              <div className="flex text-sm font-medium">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

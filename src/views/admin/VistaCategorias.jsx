import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCategorias from "@/api/categorias.js";

export default function VistaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 2 });

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => row.getValue("nombre"),
    },
    {
      accessorKey: "products",
      header: () => {
        return <span className="flex justify-center">Nro. Productos</span>;
      },
      cell: ({ row }) => {
        return (
          <span className="flex justify-center">
            {row.getValue("products")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => {
        return <span className="flex justify-end">Acciones</span>;
      },
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Link
              className="underline"
              to={`/admin/categorias/${row.getValue("id")}/update`}
            >
              Ver
            </Link>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: categorias,
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

  async function obtenerCategorias() {
    const categoriasData = await apiCategorias.obtenerTodasLasCategorias();
    setCategorias(categoriasData);
  }

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <main className="flex-1 flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2 bg-white">
      <div className="flex gap-x-8">
        <div className="flex-grow flex flex-col gap-y-4">
          <Input
            className="rounded-none border-none"
            type="search"
            placeholder="Buscar categoría"
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
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
                          <TableCell key={cell.id}>
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
            <div className="flex items-center justify-end">
              <div className="space-x-2">
                <Button
                  className="rounded-none border-none"
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  className="rounded-none border-none"
                  variant="outline"
                  size="sm"
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

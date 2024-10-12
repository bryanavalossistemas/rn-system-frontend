import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import apiCompras from "@/api/Compras";
import BotonCrearDetalle from "./BotonCrearDetalle";
import BotonActualizarDetalle from "./BotonActualizarDetalle";
import { PlusCircle, Trash } from "lucide-react";
import useComprasStore from "@/store/compras/ComprasStore";
import { formatCurrency } from "@/utils/funciones";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BotonSeleccionarProveedor from "./BotonSeleccionarProveedor";

export default function BotonCrear({ obtenerCompras, productos, proveedores }) {
  const [open, setOpen] = useState(false);
  const [proveedor, setProveedor] = useState("");
  const limpiarDetallesCompra = useComprasStore(
    (state) => state.limpiarDetallesCompra
  );
  const detallesCompra = useComprasStore((state) => state.detallesCompra);
  const eliminarDetalleCompra = useComprasStore(
    (state) => state.eliminarDetalleCompra
  );

  async function handleSubmit() {
    if (!proveedor) {
      toast.error("Debe seleccionar un proveedor");
      return;
    }
    if (detallesCompra.length === 0) {
      toast.error("Debe agregar al menos un detalle de compra");
      return;
    }
    await apiCompras.crearCompra({ proveedor, detallesCompra });
    toast.success("Compra creada correctamente");
    limpiarDetallesCompra();
    setProveedor("");
    obtenerCompras();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-x-1 w-full sm:w-auto"
          onClick={() => {
            limpiarDetallesCompra();
            setProveedor("");
          }}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only whitespace-nowrap">
            agregar Compra
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="min-w-[75vw] min-h-[75vh] flex flex-col gap-y-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-center">Crear Compra</CardTitle>
            <CardDescription className="text-center">
              Agregue una compra aquí. Haga clic en agregar cuando haya
              terminado.
            </CardDescription>
          </CardHeader>
          <div className="flex px-6 gap-x-2">
            {/* BOTON DE SELECCIONAR PROVEEDOR */}
            <BotonSeleccionarProveedor
              proveedor={proveedor}
              proveedores={proveedores}
              setProveedor={setProveedor}
            />
            {/* BOTON DE CREAR DETALLE */}
            <BotonCrearDetalle productos={productos} />
          </div>
          <CardContent className="flex-1 grid gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Costo</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detallesCompra.map((detalleCompra) => (
                  <TableRow key={detalleCompra.id}>
                    <TableCell>{detalleCompra.producto.nombre}</TableCell>
                    <TableCell className="text-center">
                      {detalleCompra.cantidad}
                    </TableCell>
                    <TableCell className="font-medium text-right">
                      {formatCurrency(detalleCompra.precioCosto)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-x-1 justify-end">
                        <div className="hidden sm:block">
                          <BotonActualizarDetalle
                            productos={productos}
                            detalleCompra={detalleCompra}
                          />
                        </div>
                        <Button
                          className="px-2 sm:px-4 sm:gap-x-1"
                          onClick={() => {
                            eliminarDetalleCompra(detalleCompra.id);
                            toast.success("Detalle eliminado correctamente");
                          }}
                        >
                          <Trash className="w-5 h-5" />
                          <span className="hidden sm:block">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="flex flex-col gap-y-2 sm:flex-row-reverse sm:gap-x-2">
              <Button onClick={handleSubmit}>Agregar</Button>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

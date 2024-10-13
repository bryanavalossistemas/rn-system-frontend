import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import useVentasStore from "@/store/ventas/VentasStore";
import VentaPDF from "./VentaPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import apiVentas from "@/api/Ventas";

export default function BotonCrearVenta({ cliente, setCliente }) {
  const detallesVenta = useVentasStore((state) => state.detallesVenta);
  const limpiarVentasStore = useVentasStore(
    (state) => state.limpiarVentasStore
  );
  const [ventaPDF, setVentaPDF] = useState("");
  const [open, setOpen] = useState(false);

  async function registrarVenta() {
    if (detallesVenta.length < 1) {
      toast.error("Debe agregar a lo menos un detalle de venta");
      return;
    }
    if (!cliente) {
      toast.error("Debe seleccionar un cliente");
      return;
    }
    const venta = await apiVentas.crearVenta({ detallesVenta, cliente });
    setVentaPDF(venta);
    setOpen(true);
    toast.success("Venta creada correctamente");
    limpiarVentasStore();
  }

  return (
    <>
      <Button
        className="h-12 transition-all text-base"
        type="button"
        onClick={registrarVenta}
      >
        Confirmar Venta
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-5 flex flex-col gap-y-2 w-[50vw] h-[90vh] rounded-sm">
          <PDFDownloadLink
            className="flex justify-center"
            document={<VentaPDF venta={ventaPDF} />}
            fileName="fac.pdf"
          >
            {({ loading, url, error, blob }) =>
              loading ? (
                <Button>Cargando ...</Button>
              ) : (
                <Button>Descargar ahora</Button>
              )
            }
          </PDFDownloadLink>
          <PDFViewer className="flex-1">
            <VentaPDF venta={ventaPDF} />
          </PDFViewer>
        </DialogContent>
      </Dialog>
    </>
  );
}

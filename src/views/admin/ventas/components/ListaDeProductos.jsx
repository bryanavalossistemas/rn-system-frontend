import { formatCurrency } from "@/utils/funciones";
import { Card } from "@/components/ui/card";
import BotonAgregarDetalleVenta from "./BotonAgregarDetalleVenta";

export default function ListaDeProductos({ tabla }) {
  return (
    <ul className="flex-1 grid sm:grid-cols-2 gap-2">
      {tabla.getRowModel().rows?.length ? (
        tabla.getRowModel().rows.map((row) => (
          <Card
            className="p-3 sm:p-2 space-y-2 overflow-hidden h-fit"
            key={row.id}
          >
            <div className="flex items-center gap-x-6">
              <Card className="max-w-32 max-h-20 flex items-center justify-center">
                <img
                  src={row.getValue("imagenProducto")}
                  alt={row.getValue("nombre")}
                  className="h-20 object-contain"
                />
              </Card>
              <div className="flex flex-col gap-y-2">
                <h3 className="sm:text-xl font-bold line-clamp-2">
                  {row.getValue("nombre")}
                </h3>
              </div>
            </div>
            <p className="text-gray-500 line-clamp-2 text-sm">
              Descripcion Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Voluptas rerum saepe molestiae exercitationem soluta? Rerum
              laborum voluptatum animi natus fugiat corrupti magni enim expedita
              dolores dolorem. Nulla eveniet minus voluptas.
            </p>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">
                {formatCurrency(row.getValue("precioVenta"))}
              </h1>
              <BotonAgregarDetalleVenta producto={row.original} />
            </div>
          </Card>
        ))
      ) : (
        <div className="flex col-span-2 text-center items-center justify-center">
          No hay resultados.
        </div>
      )}
    </ul>
  );
}

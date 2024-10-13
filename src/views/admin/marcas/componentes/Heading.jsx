export default function Heading() {
    return (
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
          Marcas
        </h1>
        <p className="text-muted-foreground text-sm hidden sm:block">
          La Gestión de Marcas permite al administrador gestionar de manera eficiente las marcas de productos en el sistema de facturación.
          A través de esta vista, el administrador puede crear, editar y eliminar marcas, asegurando que el inventario esté correctamente
          organizado para facilitar las compras a proveedores y las ventas a clientes.
        </p>
      </div>
    );
  }
  
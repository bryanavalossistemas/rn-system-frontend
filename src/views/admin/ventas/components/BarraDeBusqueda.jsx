import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function BarraDeBusqueda({ tabla }) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar productos..."
        className="pl-8"
        onChange={(event) =>
          tabla.getColumn("nombre")?.setFilterValue(event.target.value)
        }
        value={tabla.getColumn("nombre")?.getFilterValue() ?? ""}
      />
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function ContenedorImagen({ src, onSelectFile, className }) {
  return (
    <div className={cn("flex flex-col gap-y-5", className)}>
      <img
        className="flex-1 object-contain"
        src={src ? src : "/placeholder.jpg"}
        alt="imagen"
      />
      <div className="flex justify-center">
        <label
          className="bg-red-500 px-3 py-1.5 rounded-sm text-white text-sm font-medium hover:cursor-pointer hover:bg-red-600"
          htmlFor="image"
          type="button"
        >
          Agregar Imagen
        </label>
        <input
          className="hidden"
          type="file"
          id="image"
          onChange={onSelectFile}
        />
      </div>
    </div>
  );
}

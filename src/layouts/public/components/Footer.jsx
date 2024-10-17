export default function Footer() {
  const copyright = new Date();
  const update = copyright.getFullYear();

  return (
    <footer className="h-10 flex justify-center bg-teal-400">
      <div className="flex items-center justify-center text-sm">
        &copy; Todos los derechos reservados Ing. Software II - {update}
      </div>
    </footer>
  );
}

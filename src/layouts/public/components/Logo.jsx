import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to={"/"}
      className="font-extrabold text-3xl text-white transform hover:scale-125 transition duration-300"
    >
      R&N
    </Link>
  );
}

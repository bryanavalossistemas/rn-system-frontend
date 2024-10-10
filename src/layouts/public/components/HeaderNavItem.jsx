export default function HeaderNavItem({ navItem }) {
  return (
    <a
      href={navItem.href}
      className="p-2 text-base transition-all duration-300 hover:bg-white hover:text-black hover:rounded-[15px]"
    >
      {navItem.label}
    </a>
  );
}

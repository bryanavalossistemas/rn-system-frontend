export default function HeaderNavItem({ navItem }) {
  return (
    <a key={navItem.id} href={navItem.href} className="hover:underline">
      {navItem.label}
    </a>
  );
}

import Link from "next/link";

export default function NavLink({ item, onClick, className }) {
  return item.link.includes("http") ? (
    <a
      className={`${className} w-full text-left leading-[2.375rem]`}
      href={item.link}
      onClick={onClick}
      rel="noreferrer"
      target="_blank"
    >
      {item.title}
    </a>
  ) : (
    <Link
      className={`${className} w-full text-left leading-[2.375rem]`}
      href={item.link}
      onClick={onClick}
    >
      {item.title}
    </Link>
  );
}

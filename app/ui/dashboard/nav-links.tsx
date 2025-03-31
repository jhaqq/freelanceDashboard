"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Invoices", href: "/invoices" },
    { name: "Customers", href: "/customers" },
  ];

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "bg-gray-50 h-[48px] w-full rounded-md flex grow items-center justify-start mb-3 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-yellow-100 text-yellow-600":
                link.href.length > 1
                  ? pathname.startsWith(link.href)
                  : pathname == link.href,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
      <div className="flex grow bg-gray-50 rounded-md mb-3" />
    </>
  );
}

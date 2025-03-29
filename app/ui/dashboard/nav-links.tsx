import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <Link
        className="bg-gray-50 h-[48px] w-full rounded-md flex grow items-center justify-start mb-3 md:flex-none md:justify-start md:p-2 md:px-3"
        href="/"
      >
        <p className="p-3">Dashboard</p>
      </Link>
      <Link
        className="bg-gray-50 h-[48px] w-full rounded-md flex grow items-center justify-start mb-3 md:flex-none md:justify-start md:p-2 md:px-3"
        href="/invoices"
      >
        <p className="p-2">Invoices</p>
      </Link>
      <Link
        className="bg-gray-50 h-[48px] w-full rounded-md flex grow items-center justify-start mb-3 md:flex-none md:justify-start md:p-2 md:px-3"
        href="/customers"
      >
        <p className="p-2">Customers</p>
      </Link>
      <div className="flex grow bg-gray-50 rounded-md mb-3" />
    </>
  );
}

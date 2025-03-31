import {
  CreateInvoice,
  UpdateInvoice,
  DeleteInvoice,
} from "../ui/invoices/buttons";
import Image from "next/image";
import InvoicesTable from "../ui/invoices/table";
import Search from "../ui/search";
import { fetchInvoicesPages } from "../lib/db";
import Pagination from "../ui/pagination";

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={"Search invoices..."} />
        <CreateInvoice />
      </div>
      <InvoicesTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex justify-center w-full">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

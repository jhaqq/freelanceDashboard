import { CreateInvoice, UpdateInvoice, DeleteInvoice } from "../ui/invoices/buttons";
import Image from "next/image";
import InvoicesTable from "../ui/invoices/table";
import Search from "../ui/search";

export default function Page({ placeholder }: { placeholder: string }) {
  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-2xl">Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={"Search invoices..."}/>
        <CreateInvoice />
      </div>
      <InvoicesTable />
    </div>
  );
}

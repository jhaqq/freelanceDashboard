import { deleteInvoice } from "@/app/lib/actions";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateInvoice() {
  return (
    <Link
      className="flex h-10 items-center rounded-lg bg-yellow-500 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-400  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      href="/invoices/create"
    >
      <p className="hidden md:block">Create Invoice</p>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      // Have to add ID here
      href={`/invoices/${id}/edit`}
      className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button className="rounded-md border border-gray-200 p-2 hover:bg-gray-100">
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

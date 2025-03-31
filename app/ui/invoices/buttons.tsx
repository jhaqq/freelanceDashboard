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

export function UpdateInvoice() {
  return (
    <Link
    // Have to add ID here
      href="/invoices/6970f423-cacf-4daa-a2f2-239b72134579/edit"
      className="rounded-md border border-gray-200 p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice() {
  return (
    <div className="rounded-md border border-gray-200 p-2 hover:bg-gray-100">
      <TrashIcon className="w-5" />
    </div>
  );
}

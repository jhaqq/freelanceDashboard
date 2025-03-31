import { fetchPendingInvoices } from "@/app/lib/db";
import clsx from "clsx";
import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function PendingInvoice({
  name,
  image_url,
  date,
  amount,
  notFirst,
}: {
  name: string;
  image_url: string;
  date: string;
  amount: string;
  notFirst: boolean;
}) {
  return (
    <div
      className={clsx("flex flex-row items-center justify-between py-4", {
        "border-t": notFirst,
      })}
    >
      <div className="flex items-center">
        <Image
          src={image_url}
          alt={`${name}'s profile picture`}
          className="mr-4 rounded-full"
          width={32}
          height={32}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold 2xl:text-base">{name}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="truncate text-sm font-medium 2xl:text-base">{amount}</p>
        <p className="truncate text-sm text-gray-500 font-medium 2xl:text-base">
          {date}
        </p>
      </div>
    </div>
  );
}

export default async function PendingInvoices() {
  const pendingInvoices = await fetchPendingInvoices();

  return (
    <div className="xl:flex w-full flex-col hidden">
      <h3 className="text-xl md:text-2xl mb-4">Pending Invoices</h3>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {pendingInvoices.map((invoice, index) => (
            <PendingInvoice
              key={invoice.id}
              name={invoice.name}
              date={invoice.date}
              image_url={invoice.image_url}
              amount={invoice.amount}
              notFirst={index > 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

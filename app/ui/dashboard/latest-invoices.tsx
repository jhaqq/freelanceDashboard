import { fetchLatestInvoices } from "@/app/lib/db";
import Image from "next/image";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export function LatestInvoice({
  name,
  image_url,
  email,
  amount,
  notFirst,
}: {
  name: string;
  image_url: string;
  email: string;
  amount: number | string;
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
          <p className="truncate text-sm font-semibold md:text-base">{name}</p>
          <p className="hidden text-sm text-gray-500 2xl:block">{email}</p>
        </div>
      </div>
      <p className="truncate text-sm font-medium md:text-base">{amount}</p>
    </div>
  );
}

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-xl md:text-2xl mb-4">Latest Invoices</h3>
      <div className="flex grow flex-col justify-center rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, index) => (
            <LatestInvoice
              key={index}
              name={invoice.name}
              image_url={invoice.image_url}
              email={invoice.email}
              amount={invoice.amount}
              notFirst={index > 0}
            />
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

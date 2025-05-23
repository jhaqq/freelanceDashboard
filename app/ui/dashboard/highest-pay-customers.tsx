import { fetchHighestPayCustomers } from "@/app/lib/db";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function HighestPayCustomer({
  name,
  image_url,
  date,
  totalPaid,
  notFirst,
}: {
  name: string;
  image_url: string;
  date: string;
  totalPaid: string;
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
      <p className="truncate text-sm font-medium 2xl:text-base">{totalPaid}</p>
    </div>
  );
}

export default async function HighestPayCustomers() {
  const customers = await fetchHighestPayCustomers();
  return (
    <div className="flex w-full flex-col">
      <h3 className="text-xl md:text-2xl mb-4">Largest Customers</h3>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {customers.map((customer, index) => (
            <HighestPayCustomer
              key={index}
              name={customer.name}
              date={customer.date}
              image_url={customer.image_url}
              totalPaid={customer.total_paid}
              notFirst={index > 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

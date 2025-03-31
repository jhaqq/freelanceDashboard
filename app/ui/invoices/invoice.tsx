import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "./buttons";

export default function Invoice({
  id,
  name,
  image_url,
  email,
  amount,
  date,
  status,
  platform
}: {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  date: string;
  status: string;
  platform: string
}) {
  return (
    <tr className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            alt="Profile Picture"
            src={image_url}
            width={28}
            height={28}
          />
          <p className="capitalize">{name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">{email}</td>
      <td className="whitespace-nowrap px-3 py-3">{amount}</td>
      <td className="whitespace-nowrap px-3 py-3">{date}</td>
      <td className="whitespace-nowrap px-3 py-3 capitalize">{status}</td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateInvoice id={id}/>
          <DeleteInvoice />
        </div>
      </td>
    </tr>
  );
}

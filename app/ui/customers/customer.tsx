import Image from "next/image";

export default function Customer({
  name,
  image_url,
  email,
  total_invoices,
  total_pending,
  total_paid,
}: {
  name: string;
  image_url: string;
  email: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}) {
  return (
    <tr
      className="group"
    >
      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
        <div className="flex items-center gap-3">
          <Image
            src={image_url}
            className="rounded-full"
            alt="Profile Picture"
            width={28}
            height={28}
          />
          <p>{name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 tet-sm">
        {email}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 tet-sm">{total_invoices}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 tet-sm">{total_pending}</td>
      <td className="whitespace-nowrap bg-white px-4 py-5 tet-sm">{total_paid}</td>
    </tr>
  );
}

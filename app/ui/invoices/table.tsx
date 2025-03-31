import { fetchInvoices } from "@/app/lib/db";
import Invoice from "./invoice";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const invoices = await fetchInvoices();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">

            </div> */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices.map((invoice, index) => (
                <Invoice
                  key={index}
                  name={invoice.name}
                  image_url={invoice.image_url}
                  email={invoice.email}
                  amount={invoice.amount}
                  date={invoice.date}
                  status={invoice.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

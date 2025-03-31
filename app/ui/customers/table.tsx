import { fetchFilteredCustomers } from "@/app/lib/db";
import Customer from "./customer";

export default async function CustomersTable() {
  const customers = await fetchFilteredCustomers();

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            {/* Mobile responsiveness */}
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Invoices
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Paid
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-900">
                {customers.map((customer) => (
                  <Customer
                    key={customer.id}
                    name={customer.name}
                    image_url={customer.image_url}
                    email={customer.email}
                    total_invoices={customer.total_invoices}
                    total_pending={customer.total_pending}
                    total_paid={customer.total_paid}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

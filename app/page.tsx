import Card from "./ui/dashboard/card";
import CardWrapper from "./ui/dashboard/card-wrapper";
import HighestPayCustomers from "./ui/dashboard/highest-pay-customers";
import LatestInvoices from "./ui/dashboard/latest-invoices";
import PendingInvoices from "./ui/dashboard/pending-invoices";

export default function Home() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      {/* display grid (at least in flexbox) will default to cols-1 */}
      <div className="grid gap-6 lg:grid-cols-4 sm:grid-cols-2 mb-4">
        <CardWrapper />
      </div>
      {/* children in grid layout will have the same height. who woulda thought! */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <LatestInvoices />
        <PendingInvoices />
        <HighestPayCustomers />
      </div>
    </main>
  );
}

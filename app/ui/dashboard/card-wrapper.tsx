import { fetchCardInfo } from "@/app/lib/db";
import Card from "./card";
import { formatCurrency } from "@/app/lib/utils";

export default async function CardWrapper() {
  const { numberOfCustomers, numberOfInvoices, amountPaidInvoices, amountPendingInvoices } = await fetchCardInfo();

    const paidInvoices = formatCurrency(amountPaidInvoices)
    const pendingInvoices = formatCurrency(amountPendingInvoices)

  return (
    <>
      <Card title={"Total Paid"} value={paidInvoices} />
      <Card title={"Total Invoices"} value={numberOfInvoices} />
      <Card title={"Pending Amount"} value={pendingInvoices} />
      <Card title={"Total Customers"} value={numberOfCustomers} />
    </>
  );
}

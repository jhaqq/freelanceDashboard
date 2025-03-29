import postgres from "postgres";
import { LatestInvoiceRaw, HighestPayCustomerRaw, PendingInvoiceRaw } from "./definitions";
import { formatCurrency, formatDateToLocal } from "./utils";

const sql = postgres(process.env.DATABASE_URL!);

export async function fetchCardInfo() {
  const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
  const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
  const invoiceAmountPromise = sql`SELECT
    SUM(CASE WHEN status ='paid' THEN amount ELSE 0 END) AS "paid",
    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    FROM invoices
    `;

  const data = await Promise.all([
    customerCountPromise,
    invoiceCountPromise,
    invoiceAmountPromise,
  ]);

  const numberOfCustomers = data[0][0].count;
  const numberOfInvoices = data[1][0].count;
  const amountPaidInvoices = data[2][0].paid;
  const amountPendingInvoices = data[2][0].pending;

  return {
    numberOfCustomers,
    numberOfInvoices,
    amountPaidInvoices,
    amountPendingInvoices,
  };
}

export async function fetchLatestInvoices() {
  const data = await sql<LatestInvoiceRaw[]>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
    `;

  const latestInvoices = data.map((invoice) => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
  }));

  return latestInvoices;
}

export async function fetchHighestPayCustomers() {
  const data = await sql<HighestPayCustomerRaw[]>`
    SELECT 
      customers.id AS customer_id,
      customers.name,
      customers.email,
      customers.image_url,
      customers.date,
      SUM(invoices.amount) AS total_paid
    FROM 
      invoices
    JOIN 
      customers ON invoices.customer_id = customers.id
    GROUP BY 
      customers.id, customers.name, customers.email, customers.image_url, customers.date
    ORDER BY 
      total_paid DESC
    LIMIT 5
  `;

  const highestPayCustomers = data.map((customer) => ({
    ...customer,
    total_paid: formatCurrency(customer.total_paid),
    date: formatDateToLocal(customer.date),
  }));

  return highestPayCustomers;
}

export async function fetchPendingInvoices() {
    const data = await sql<PendingInvoiceRaw[]>`
    SELECT
    invoices.amount, invoices.date, customers.name, customers.image_url, invoices.id
    FROM
    invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.status = 'pending'
    ORDER BY invoices.amount DESC
    LIMIT 5
    `
    const pendingInvoices = data.map((invoice) => ({
        ...invoice,
        amount: formatCurrency(invoice.amount),
        date: formatDateToLocal(invoice.date)
    }))

    return pendingInvoices;
}
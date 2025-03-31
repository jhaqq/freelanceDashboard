import postgres from "postgres";
import {
  LatestInvoiceRaw,
  HighestPayCustomerRaw,
  PendingInvoiceRaw,
  Customer,
  CustomerRaw,
  InvoiceRaw,
  CustomerField,
  InvoiceForm,
} from "./definitions";
import { formatCurrency, formatDateToLocal } from "./utils";

const sql = postgres(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 6;

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
    `;
  const pendingInvoices = data.map((invoice) => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
    date: formatDateToLocal(invoice.date),
  }));

  return pendingInvoices;
}

// Add search functionality
export async function fetchInvoicesForTable(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const invoices = await sql<InvoiceRaw[]>`
      SELECT
        invoices.id,
        customers.name,
        customers.image_url,
        customers.email,
        invoices.amount,
        invoices.date,
        invoices.status
      FROM
        invoices
      JOIN
        customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

  console.log(invoices);
  return invoices;
}

export async function fetchInvoiceById(id: string) {
  const data = await sql<InvoiceForm[]>`
  SELECT
  invoices.id,
  invoices.customer_id,
  invoices.amount,
  invoices.status
  FROM invoices
  WHERE invoices.id = ${id}
  `;

  const invoice = data.map((invoice) => ({
    ...invoice,
    amount: invoice.amount / 100,
  }));

  return invoice[0];
}

export async function fetchInvoicesPages(query: string) {
  const data = await sql`
  SELECT COUNT(*)
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
  WHERE 
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

  const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE)
  return totalPages
}

// Add search functionality
export async function fetchFilteredCustomers() {
  const data = await sql<CustomerRaw[]>`
  SELECT
    customers.id AS customer_id,
    customers.name,
    customers.email,
    customers.image_url,
    COALESCE(COUNT(invoices.id), 0) AS total_invoices,
    SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
    SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
    FROM
      customers
    LEFT JOIN
      invoices ON invoices.customer_id = customers.id
    GROUP BY
      customers.id, customers.name, customers.email, customers.image_url
  `;

  const customers = data.map((customer) => ({
    ...customer,
    total_pending: formatCurrency(customer.total_pending),
    total_paid: formatCurrency(customer.total_paid),
  }));

  return customers;
}

export async function fetchCustomers() {
  const customers = await sql<CustomerField[]>`
  SELECT
    id,
    name
  FROM customers
  ORDER BY name ASC
  `;
  return customers;
}

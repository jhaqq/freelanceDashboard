export type Invoice = {
    id: string,
    name: string,
    image_url: string,
    email: string,
    amount: string,
    customer_id: string,
    date: string,
    status: 'pending' | 'paid'
}

export type InvoiceRaw = Omit<Invoice, 'amount | date'> & {
    amount: number,
    date: Date
}

export type Customer = {
    id: string,
    name: string,
    email: string,
    image_url: string,
    total_invoices: number,
    total_pending: string,
    total_paid: string
}

export type CustomerRaw = Omit<Customer, 'total_pending | total_paid'> & {
    total_pending: number,
    total_paid: number
}

export type LatestInvoice = {
    id: string,
    name: string,
    email: string,
    amount: string,
    image_url: string,
}

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount | date'> & {
    amount: number;
    date: Date;
}

export type PendingInvoice = {
    id: string,
    name: string,
    image_url: string,
    amount: string,
    date: string
}

export type PendingInvoiceRaw = Omit<PendingInvoice, 'amount | date'> & {
    amount: number,
    date: Date
}

export type HighestPayCustomer = {
    id: string,
    name: string,
    image_url: string,
    date: string,
    total_paid: string
}

export type HighestPayCustomerRaw = Omit<HighestPayCustomer, 'amount | date'> & {
    total_paid: number;
    date: Date;
}

export type CustomerField = {
    id: string;
    name: string
}

export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid'
}
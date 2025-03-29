export type Customer = {
    id: string,
    name: string,
    email: string,
    image_url: string
}

export type Invoice = {
    id: string,
    amount: number,
    customer_id: string,
    date: string,
    status: 'pending' | 'paid'
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
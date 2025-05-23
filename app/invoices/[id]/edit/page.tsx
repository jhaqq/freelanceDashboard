import { fetchCustomers, fetchInvoiceById } from "@/app/lib/db";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default async function Page(props:  { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ])
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/invoices"},
                    {
                        label: "Edit Invoice",
                        // Need to add ID to href
                        href: `/invoices/${id}/edit`,
                        active: true
                    }
                ]}
                />
                <EditInvoiceForm invoice={invoice} customers={customers} />
        </main>
    )
}
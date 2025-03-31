import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/invoices"},
                    {
                        label: "Edit Invoice",
                        // Need to add ID to href
                        href: `/invoices/6970f423-cacf-4daa-a2f2-239b72134579/edit`,
                        active: true
                    }
                ]}
                />
                <EditInvoiceForm />
        </main>
    )
}
import CustomersTable from "../ui/customers/table";
import Search from "../ui/search";

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-xl md:text-2xl">Customers</h1>
      <Search placeholder={"Search customers..."} />
      <CustomersTable />
    </div>
  );
}

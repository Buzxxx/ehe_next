import { DataTable } from "../../ui/table";
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function EmployeeTable() {
  const data = await getData()

  return (
    <div className=" md:mx-auto md:py-10 py-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

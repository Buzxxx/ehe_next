import CreateLeadForm from "@/components/lead/feature/forms/createLeadForm"

export default function CreateLead() {
  return (
    <>
      <h1 className="pt-2 text-4xl text-neutral-600 font-semibold">
        Lead
        <span className="text-xl ml-4 text-neutral-900 font-medium">Create Lead</span>
      </h1>
      <CreateLeadForm />
    </>
  )
}

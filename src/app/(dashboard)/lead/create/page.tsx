import CreateLeadForm from "@/components/lead/feature/createLeadForm"

export default function CreateLead() {
  return (
    <>
      <h1 className="text-2xl text-neutral-900 font-normal">
        Lead
        <span className="text-base ml-4 text-neutral-600">Create Lead</span>
      </h1>
      <CreateLeadForm />
    </>
  )
}

"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const NewLayoutCard = () => {
  const router = useRouter()
  return (
    <Card
      onClick={() => router.push("/email/customTemplateBuilder")}
      className="p-4 min-h-80 cursor-pointer flex flex-col items-center justify-center border border-gray-300"
    >
      <CardContent>
        <CardTitle className="flex flex-col items-center justify-center text-center gap-4">
          <PlusCircle />
          <p className="text-lg">Create New Template</p>
        </CardTitle>
      </CardContent>
    </Card>
  )
}

export default NewLayoutCard

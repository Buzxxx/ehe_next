import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogTitle } from "@/components/ui/dialog"
import React from "react"

const DeleteEntityConfirmation = ({
  entity,
  onConfirm,
  onCancel,
}: {
  entity: string
  onConfirm: () => void
  onCancel: () => void
}) => {
  return (
    <Card className="pt-0 border-0 sm:shadow-none shadow-none">
      <CardHeader className="pt-0 pb-4 ">
        <DialogTitle className="md:text-2xl text-lg">Are you sure?</DialogTitle>
      </CardHeader>

      <CardContent className="text-gray-600 md:text-base text-sm text-pretty">
        <p>Are you sure you want to delete {entity}?</p>
        <p>This action is irrevocable.</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center pb-0">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default DeleteEntityConfirmation

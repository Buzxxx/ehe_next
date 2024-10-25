'use client'

import Avataar from "@/components/dashboard/ui/avataar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ModalUI from "../ui/ModalUI"
import PropertyForm from "@/components/propertyPage/features/propertyForm"

const PropertyListerInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  })

  const handleOpenModal = (type: "ask" | "info") => {
    // Set title and description based on button clicked
    if (type === "ask") {
      setModalContent({
        title: "Authentication Required",
        description: "Authenticate yourself to ask the lister a question.",
      })
    } else if (type === "info") {
      setModalContent({
        title: "Access Restricted",
        description: "Please authenticate to view the lister's information.",
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <div className="md:mt-12 mt-4">
      <h4 className="text-xl font-semibold">Listed By Property Owner</h4>

      <div className="flex justify-between mt-4 flex-1 md:flex-auto items-center">
        <div className="flex gap-2 ">
          <Avataar />
          <div>
            <h6 className="text-md font-medium"> John Does</h6>
            <p className="text-xs text-slate-600"> Company name</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleOpenModal("ask")}
            className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 w-fit text-xs h-fit md:h-full md:text-sm px-2 md:px-4"
          >
            Ask A Question
          </Button>
          <Button
            onClick={() => handleOpenModal("info")}
            className="bg-transparent text-slate-500 border border-slate-500 hover:text-slate-700 hover:border-slate-700 w-fit text-xs h-fit md:h-full md:text-sm px-2 md:px-4"
          >
            Get More Info
          </Button>
        </div>
      </div>

      {/* Modal with Dynamic Content */}
      <ModalUI
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
      >
        <p className="text-slate-600 mb-4">{modalContent.description}</p>
        <PropertyForm
          wrapperClassName="md:mt-0"
          formClassName="bg-none p-0 bg-transparent md:p-0 xl:py-0 xl:px-4 border-0 shadow-none"
          onSuccess={handleCloseModal} // Close modal on successful submission
        />
      </ModalUI>
    </div>
  )
}

export default PropertyListerInfo

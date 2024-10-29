/**
 * @path src/components/propertyPage/features/PropertyListerInfoLogic.tsx
 */

"use client"

import { useState } from "react"
import PropertyListerInfoUI from "../ui/propertyListerUI"

const PropertyListerInfoLogic = () => {
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
    <PropertyListerInfoUI
      isModalOpen={isModalOpen}
      modalContent={modalContent}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
    />
  )
}

export default PropertyListerInfoLogic

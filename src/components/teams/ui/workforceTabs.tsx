"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import React, { useState, useEffect } from "react"
import { columns, WorkforceUser } from "./tableColumns"
import Modal from "@/components/teams/ui/workforceModal" // Import Modal Component
import { Workforce } from "../feature/workforce" // Import Workforce Class
import { sampleData } from "../lib/sampleData"
import { useToast } from "@/components/ui/use-toast"

const WorkforceTabs = () => {
  const tabList = ["Active", "Inactive"]

  const [activeTab, setActiveTab] = useState(tabList[0])
  const [data, setData] = useState<WorkforceUser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state
  const [currentWorker, setCurrentWorker] = useState<WorkforceUser | null>(null) // Current worker state

  const [workerDataSet, setWorkerDataSet] =
    useState<WorkforceUser[]>(sampleData)

  const { toast } = useToast()

  // Re-filter data based on active tab
  useEffect(() => {
    const filteredData =
      activeTab === "Active"
        ? workerDataSet.filter((worker) => worker.status === "active")
        : workerDataSet.filter((worker) => worker.status === "inactive")

    setData(filteredData)
  }, [activeTab, workerDataSet]) // Re-run when activeTab or workerDataSet changes

  const handleOpenModal = (worker: WorkforceUser) => {
    setCurrentWorker(worker)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentWorker(null)
  }

  const handleStatusChangeAndUpdateData = (
    userId: number,
    newStatus: string
  ) => {
    // Use the Workforce class's static method to update the dataset
    const updatedData = Workforce.handleStatusChange(
      userId,
      newStatus,
      workerDataSet
    )

    setWorkerDataSet(updatedData) // Update state with the modified dataset
    handleCloseModal() // Close the modal
    toast({
      title: `User ${userId} is now ${newStatus}`,
    })
  }

  return (
    <>
      <nav className="py-0 flex items-center justify-start bg-gray-200 w-full  rounded-t-md">
        {tabList.map((item) => (
          <Button
            key={item}
            className={`rounded-none text-xs px-2 h-8 hover:text-sky-600 hover:bg-sky-600  py-5 rounded-t-md ${
              activeTab === item
                ? "bg-gray-400 text-sky-600 border border-b-0 border-gray-300"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </Button>
        ))}
      </nav>
      <section>
        <DataTable
          columns={columns}
          data={data}
          onOpenModal={handleOpenModal} // Pass modal handler
        />
      </section>

      {/* Render Modal */}
      {isModalOpen && currentWorker && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          header={
            currentWorker.status === "active"
              ? "Deactivate Account? "
              : "Activate Account"
          }
          onConfirm={() =>
            handleStatusChangeAndUpdateData(
              currentWorker.userId,
              currentWorker.status === "active" ? "inactive" : "active"
            )
          }
        >
          <p>
            Are you sure you want to change the status of{" "}
            {currentWorker.first_name} {currentWorker.last_name}
            to {currentWorker.status === "active" ? "inactive" : "active"}?
          </p>
        </Modal>
      )}
    </>
  )
}

export default WorkforceTabs

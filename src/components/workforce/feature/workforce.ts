import { WorkforceUser } from "../ui/tableColumns"

export class Workforce {
  static handleStatusChange(
    userId: number,
    newStatus: string,
    dataset: WorkforceUser[]
  ): WorkforceUser[] {
    // Update the worker's status in the workerDataSet
    const updatedData = dataset.map((worker: WorkforceUser) =>
      worker.userId === userId ? { ...worker, status: newStatus } : worker
    )

    return updatedData // Return the modified dataset
  }
}

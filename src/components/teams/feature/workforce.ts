
import { WorkforceUser } from "../ui/tableColumns"


export type Alias = {
  type: string
  username: string
  created: string
}

export type UserAliases = {
  id: number
  aliases: Alias[]
}

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

  static getUserbyId(
    id: string,
    data: WorkforceUser[]
  ): WorkforceUser | undefined {
    // Convert id to number and find user by id
    return data.find((p) => p.userId === Number(id))
  }

  static getAliasesById(id: string, aliasesData: UserAliases[]): Alias[] {
    const aliasEntry = aliasesData.find((alias) => alias.id === Number(id))
    return aliasEntry ? aliasEntry.aliases : []
  }
}

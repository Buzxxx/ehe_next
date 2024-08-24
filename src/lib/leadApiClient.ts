// lib/leadApiClient.ts

class Lead {
  private filter_by: string = ""
  private sort_by: string = ""
  private per_page: number = 10
  private page: number = 1

  setFilterBy(filter: string): this {
    this.filter_by = filter
    return this
  }

  setSortBy(sort: string): this {
    this.sort_by = sort
    return this
  }

  setPerPage(perPage: number): this {
    this.per_page = perPage
    return this
  }

  setPage(page: number): this {
    this.page = page
    return this
  }

  buildQuery(): string {
    const params = new URLSearchParams()
    if (this.filter_by) params.append("filter_by", this.filter_by)
    if (this.sort_by) params.append("sort_by", this.sort_by)
    params.append("per_page", this.per_page.toString())
    params.append("page", this.page.toString())
    return params.toString()
  }
}

class LeadApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = "https://www.eheindustries.com/lead/api"
  }

  async createLead(data: any) {
    try {
      const response = await fetch(`${this.baseURL}/createlead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Failed to create lead: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error during API request:", error)
      throw new Error(`Failed to create lead: ${(error as Error).message}`)
    }
  }

  async getLeads(lead: Lead) {
    try {
      const queryParams = lead.buildQuery()
      const response = await fetch(`${this.baseURL}/leads?${queryParams}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch leads: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Failed to fetch leads: ${(error as Error).message}`)
    }
  }
}

export default new LeadApiClient()
export { Lead }

// Usage Example:
// const leadApiClient = new LeadApiClient()
// const lead = new Lead()
//   .setFilterBy("status:open")
//   .setSortBy("date")
//   .setPerPage(5)
//   .setPage(2)

// leadApiClient.getLeads(lead).then(console.log).catch(console.error)

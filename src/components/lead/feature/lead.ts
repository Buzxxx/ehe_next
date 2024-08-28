// Lead.ts

export class Lead {
  private baseURL: string
  private url: string

  constructor() {
    this.baseURL = "https://www.eheindustries.com/lead/api"
    this.url = ""
  }

  setUrl(queryParams: string) {
    this.url = `${this.baseURL}/leads?${queryParams}`
  }

  async getLeads() {
    try {
      const response = await fetch(this.url)
      if (!response.ok) {
        throw new Error(`Failed to fetch leads: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Failed to fetch leads: ${(error as Error).message}`)
    }
  }
}

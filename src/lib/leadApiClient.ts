// lib/leadApiClient.ts

class LeadApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = "https://www.eheindustries.com/lead/api"
  }

  async createLead(data: any) {
    console.log("Preparing to send API request with data:", data)
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

  async getLeads({
    filter_by = "",
    sort_by = "",
    per_page = 10,
    page = 1,
  }: {
    filter_by?: string
    sort_by?: string
    per_page?: number
    page?: number
  } = {}) {
    try {
      const queryParams = new URLSearchParams({
        filter_by,
        sort_by,
        per_page: per_page.toString(),
        page: page.toString(),
      })

      const response = await fetch(
        `${this.baseURL}/leads?${queryParams.toString()}`
      )

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

// async getLeads() {
//   try {
//     const response = await fetch(this.baseURL)

//     if (!response.ok) {
//       throw new Error(`Failed to fetch leads: ${response.statusText}`)
//     }

//     return await response.json()
//   } catch (error) {
//     throw new Error(`Failed to fetch leads: ${(error as Error).message}`)
//   }
// }

// async getLeadById(id: string) {
//   try {
//     const response = await fetch(`${this.baseURL}/${id}`)

//     if (!response.ok) {
//       throw new Error(`Failed to fetch lead: ${response.statusText}`)
//     }

//     return await response.json()
//   } catch (error) {
//     throw new Error(`Failed to fetch lead: ${(error as Error).message}`)
//   }
// }

// {
// "name" : "Avinash", String
// "email" : "avi@gmail.com", Email
// "contact" : "919163833719", Phone WIth country code
// "lead_type" : "Domestic", String
// "query" : "I am Interested",String
// "interested_in" : "Rent in DLF New Town Heights 1, Sector-90, Gurgaon", String -- Textbox
// "assigned_to" : "Avinash.jha", Dropdown
// "product_code" : "DFT145", Text
// "product_type" : "Commercial", Text
// "source" :"4", Dynamic userId - NON SELECTaBLE
// "status" : 1, DEFAULT
// "priority" : "cold" Dropdown
// }

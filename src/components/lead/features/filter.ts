// File: Filter.ts

export class Filter {
  private baseUrl: string =  window.location.origin+ "/lead" // Default to current origin
  private filters: { [key: string]: string } = {} // Hold individual filter key-value pairs
  private sort_by: string = ""
  private per_page: number = 20
  private page: number = 1

  /**
   * Adds or updates a filter key-value pair for the filter_by parameter.
   * Only removes a filter if value is an empty string.
   */
  setFilter(key: string, value: string): this {
    if (value) {
      this.filters[key] = value // Add or update the key-value filter pair
    } else {
      delete this.filters[key] // Remove the key if the value is empty
    }
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

  /**
   * Builds the filter_by query string in the format key:value;key:value
   */
  private buildFilterByString(): string {
    return Object.entries(this.filters)
      .map(([key, value]) => `${key}:${value}`)
      .join(";")
  }

  /**
   * Builds the complete query string with all parameters.
   */
  buildQuery(): string {
    const params = new URLSearchParams()
    const filterBy = this.buildFilterByString()
    if (filterBy) params.append("filter_by", filterBy)
    if (this.sort_by) params.append("sort_by", this.sort_by)
    params.append("per_page", this.per_page.toString())
    params.append("page", this.page.toString())
    return params.toString()
  }

  /**
   * Generates a URL for redirection with query parameters.
   */
  getUrlOrDefaultUrl(): string {
    const query = this.buildQuery()
    return query
      ? `${this.baseUrl}?${query}`
      : `${this.baseUrl}?per_page=20&page=1`
  }

  /**
   * Retrieves query parameters from the given URLSearchParams and sets them in the Filter class.
   */
  setFilterParams(searchParams: URLSearchParams): void {
    const filterBy = searchParams.get("filter_by") || ""
    filterBy.split(";").forEach((filter) => {
      const [key, value] = filter.split(":")
      if (key && value) {
        this.filters[key] = value
      }
    })
    this.setSortBy(searchParams.get("sort_by") || "")
    this.setPerPage(Number(searchParams.get("per_page")) || 20)
    this.setPage(Number(searchParams.get("page")) || 1)
  }

  /**
   * Updates the URL with the current filter parameters.
   * This method updates the browser's URL without reloading the page.
   */
  updateUrl(): void {
    const query = this.buildQuery()
    const newUrl = `${this.baseUrl}?${query}`
    window.history.pushState({}, "", newUrl)
  }
}

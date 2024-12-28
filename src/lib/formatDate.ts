export function formatDate(
  dateString: string,
  options?: { onlyDate?: boolean }
): string {
  const date = new Date(dateString)

  // Check if only the date is requested
  if (options?.onlyDate) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Default behavior: return both date and time
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export const WorkforceFormatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }

  return new Intl.DateTimeFormat("en-US", options).format(date)
}

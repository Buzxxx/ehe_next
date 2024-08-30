export class Dashboard {
  // Function to get menu items based on the current page
  static getMenuItems = (
    navigateTo: (path: string) => void,
    page: string,
    onSelectAll?: () => void,
    onUnselectAll?: () => void,
    onReassign?: () => void,
    selectedCount?: number
  ) => {
    switch (page) {
      case "lead":
        return [
          { label: "Share", onClick: () => {} },
          { label: "Select All", onClick: onSelectAll },
          { label: "Unselect All", onClick: onUnselectAll },
          { label: "Dashboard", onClick: () => navigateTo("/dashboard") }, // Redirect to Dashboard
          ...(selectedCount && selectedCount > 0
            ? [{ label: "Reassign", onClick: onReassign }]
            : []),
        ]
      case "workplace":
        return [
          { label: "Manage", onClick: () => {} },
          { label: "Settings", onClick: () => navigateTo("/settings") }, // Redirect to Settings
        ]
      case "workforce":
        return [
          {
            label: "Create User",
            onClick: () => navigateTo("/workforce/create"),
          },
        ]
      default:
        return [{ label: "Help", onClick: () => {} }]
    }
  }
}

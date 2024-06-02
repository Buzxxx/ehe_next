const filterCategories = [
  {
    name: "status",
    label: "Status",
    placeholder: "Status",
    options: [
      "Closed",
      "RnR",
      "BBA",
      "Meeting Planned",
      "Follow up meeting",
      "Site Visit",
      "Invalid",
      "Already Purchased",
      "ATS In-Progress",
      "Token Done",
      "Meeting Done",
      "Not Interested",
      "Different Requirement",
      "Postponed",
      "Follow-up Needed",
      "Callback",
      "New",
    ],
  },
  {
    name: "user",
    label: "User",
    placeholder: "User",
    options: ["Self"],
  },
  {
    name: "source",
    label: "Source",
    placeholder: "Source",
    options: ["All", "Magic Bricks", "Magic Bricks Bangalore"],
  },
  {
    name: "location",
    label: "Locations",
    placeholder: "Locations",
    options: ["All"],
  },
  {
    name: "date",
    label: "Date",
    placeholder: "Date",
    options: ["Today", "Custom"],
  },
]

export default filterCategories

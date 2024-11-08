import {
  ChartNoAxesCombined,
  Group,
  Settings,
  PersonIcon,
  CheckListIcon,
  Work,
} from "@/components/ui/icons"
import { paths } from "@/app/(dashboard)/lead/urls"

const dashboardItems = [
  { title: "Analytics", icon: <ChartNoAxesCombined size={20} />, subItems: [] },
  {
    title: "Lead",
    icon: <PersonIcon size={20} color="transparent" />,
    subItems: [
      { name: "All Leads", route: paths.AllLeads },
      { name: "Create Lead", route: paths.CreateLead },
      { name: "Import Lead", route: paths.ImportLead },
    ],
  },
  { title: "Task", icon: <CheckListIcon size={20} />, subItems: [] },
  { title: "Workplace", icon: <Work size={20} color="transparent" />, subItems: [] },
  {
    title: "Workforce",
    icon: <Group size={20} />,
    subItems: [
      { name: "All Users", route: "/workforce" },
      { name: "Create User", route: "/workforce/create" },
    ],
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    subItems: [
      { name: "Change Password", route: "/auth/resetPassword" },
      { name: "Logout", route: "/auth/login" },
    ],
  },
]

export default dashboardItems

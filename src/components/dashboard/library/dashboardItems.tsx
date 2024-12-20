import {
  ChartNoAxesCombined,
  Group,
  Settings,
  PersonIcon,
  CheckListIcon,
  Work,
} from "@/components/ui/icons"
import Home from "@/components/ui/icons/home"

const dashboardItems = [
  { title: "Home", icon: <Home size={20} />, subItems: [] },
  { title: "Analytics", icon: <ChartNoAxesCombined size={20} />, subItems: [] },
  {
    title: "Lead",
    icon: <PersonIcon size={20} color="transparent" />,
    subItems: [
      { name: "All Leads", route: "/lead" },
      { name: "Create Lead", route: "/lead/create" },
      { name: "Import Lead", route: "/lead/import" },
    ],
  },
  { title: "Task", icon: <CheckListIcon size={20} />, subItems: [] },
  {
    title: "Workplace",
    icon: <Work size={20} color="transparent" />,
    subItems: [],
  },
  {
    title: "Teams",
    icon: <Group size={20} />,
    subItems: [],
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    subItems: [
      {name: "Profile", route: "/profile"},
      { name: "Account", route: "/account" },
      { name: "Logout", route: "/auth/login" },
    ],
  },
]

export default dashboardItems

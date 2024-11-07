import Work from "@/components/ui/icons/work";
import CheckListIcon from "@/components/ui/icons/checklistIcon";
import DashboardIcon from "@/components/ui/icons/dashboardIcon";
import PersonIcon from "@/components/ui/icons/personIcon";
import Settings from "@/components/ui/icons/settings";
import { Group } from "@/components/ui/icons";
import { paths } from "@/app/(dashboard)/lead/urls";

const dashboardItems = [
  { title: "Dashboard", icon: <DashboardIcon />, subItems: [] },
  {
    title: "Lead",
    icon: <PersonIcon color="transparent" />,
    subItems: [
      { name: "All Leads", route: paths.AllLeads },
      { name: "Create Lead", route: paths.CreateLead },
      {name: 'Import Lead', route: paths.ImportLead}
    ],
  },
  { title: "Task", icon: <CheckListIcon />, subItems: [] },
  { title: "Workplace", icon: <Work color="transparent" />, subItems: [] },
  {
    title: "Workforce",
    icon: <Group />,
    subItems: [
      { name: "All Users", route: "/workforce" },
      { name: "Create User", route: "/workforce/create" },
    ],
  },
  {
    title: "Settings",
    icon: <Settings />,
    subItems: [
      { name: "Change Password", route: "/auth/resetPassword" },
      { name: "Logout", route: "/auth/login" },
    ],
  },
]

export default dashboardItems;

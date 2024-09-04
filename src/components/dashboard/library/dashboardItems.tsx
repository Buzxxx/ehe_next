import Work from "@/components/ui/icons/work";
import CheckListIcon from "@/components/ui/icons/checklistIcon";
import DashboardIcon from "@/components/ui/icons/dashboardIcon";
import PersonIcon from "@/components/ui/icons/personIcon";
import Settings from "@/components/ui/icons/settings";
import { Group } from "@/components/ui/icons";

const dashboardItems = [
  { title: "Dashboard", icon: <DashboardIcon />, subItems: [] },
  {
    title: "Lead",
    icon: <PersonIcon />,
    subItems: [
      { name: "All Leads", route: "/lead" },
      { name: "Create Lead", route: "/lead/create" },
    ],
  },
  { title: "Task", icon: <CheckListIcon />, subItems: [] },
  { title: "Workplace", icon: <Work />, subItems: [] },
  {
    title: "Workforce",
    // icon: <Group />,
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

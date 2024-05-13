import Work from "@/components/ui/icons/work";
import CheckListIcon from "@/components/ui/icons/checklistIcon";
import DashboardIcon from "@/components/ui/icons/dashboardIcon";
import PersonIcon from "@/components/ui/icons/personIcon";
import Settings from "@/components/ui/icons/settings";

const dashboardItems = [
  { title: "Dashboard", icon: <DashboardIcon />, subItems: [] },
  { title: "Lead", icon: <PersonIcon />, subItems: [] },
  { title: "Task", icon: <CheckListIcon />, subItems: [] },
  { title: "Workplace", icon: <Work />, subItems: [] },
  {
    title: "Settings",
    icon: <Settings />,
    subItems: ["Change Password", "Logout"],
  },
];

export default dashboardItems;

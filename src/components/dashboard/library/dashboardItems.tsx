import Work from "@/components/ui/icons/work";
import CheckListIcon from "@/components/ui/icons/checklistIcon";
import DashboardIcon from "@/components/ui/icons/dashboardIcon";
import PersonIcon from "@/components/ui/icons/personIcon";
import Settings from "@/components/ui/icons/settings";

const dashboardItems = [
  { title: "Dashboard", href: "#", icon: <DashboardIcon />, subItems: [] },
  { title: "Lead", href: "#", icon: <PersonIcon />, subItems: [] },
  { title: "Task", href: "#", icon: <CheckListIcon />, subItems: [] },
  { title: "Workplace", href: "#", icon: <Work />, subItems: [] },
  {
    title: "Settings",
    icon: <Settings />,
    subItems: [
      { title: "Change Password", href: "/accounts/resetPassword" },
      { title: "Logout" }, // Do not include onClick here
    ],
  },
];

export default dashboardItems;

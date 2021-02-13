import Post from "./views/post-management/post";
import Log from "./views/log/log";
import User from "./views/user-management/user";
import Menber from "./views/menber-management/menber";
import Report from "./views/report/report";
import Help from "./views/help/help";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { AccountBalance, CalendarToday, Event, LaptopChromebook } from "@material-ui/icons";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <CalendarToday/>,
    component: Help,
    layout: ""
  },
  {
    path: "/report",
    name: "Report",
    icon: <CalendarToday/>,
    component: Report,
    layout: ""
  },
  {
    path: "/post-management",
    name: "Question",
    icon: <Event/>,
    component: Post,
    layout: ""
  },
  {
    path: "/user-management",
    name: "User",
    icon: <AccountBalance/>,
    component: User,
    layout: ""
  },
  {
    path: "/member-management",
    name: "Member",
    icon: <LaptopChromebook/>,
    component: Menber,
    layout: ""
  },
  {
    path: "/log",
    name: "Log",
    icon: <InboxIcon/>,
    component: Log,
    layout: ""
  },
  
];
export default dashRoutes;

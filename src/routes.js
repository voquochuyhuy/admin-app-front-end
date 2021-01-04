import Post from "./views/post-management/post";
import Log from "./views/log/log";
import User from "./views/user-management/user";
import Menber from "./views/menber-management/menber";
import Report from "./views/report/report"
var dashRoutes = [
  {
    path: "/post-management",
    name: "Quản lí bài viết",
    // icon: Event,
    component: Post,
    layout: ""
  },
  {
    path: "/user-management",
    name: "Quản lí người dùng",
    // icon: AccountBalance,
    component: User,
    layout: ""
  },
  {
    path: "/member-management",
    name: "Quản lí thành viên",
    // icon: LaptopChromebook,
    component: Menber,
    layout: ""
  },
  {
    path: "/log",
    name: "Log",
    // icon: CalendarToday,
    component: Log,
    layout: ""
  },
  {
    path: "/report",
    name: "Report",
    // icon: CalendarToday,
    component: Report,
    layout: ""
  }
];
export default dashRoutes;

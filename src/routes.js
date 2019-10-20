// @material-ui/icons
import {
  Dashboard,
  Person,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  Language,
  CastForEducation,
  People,
  Image,
  Build as BuildIcon
} from "@material-ui/icons";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UsersPage from "views/Users/Users.jsx";
import PicturesPage from "views/Pictures/Pictures.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import Login from "views/Login/Login.tsx";
import StartPage from "views/StartPage/StartPage.tsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import Guide from "views/Guide/Guide.jsx";
import Build from "views/Build/Build.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/guide",
    name: "Guide",
    rtlName: "يرشد",
    icon: CastForEducation,
    component: Guide,
    layout: "/admin",
    auth: true
  },
  {
    path: "/build",
    name: "Build",
    rtlName: "يرشد",
    icon: BuildIcon,
    component: Build,
    layout: "/admin",
    auth: true
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    auth: true
  },
  {
    path: "/users",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon: People,
    component: UsersPage,
    layout: "/admin",
    auth: true
  },
  {
    path: "/profile_user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    auth: true
  },
  {
    path: "/pictures",
    name: "Pictures",
    rtlName: "لوحة القيادة",
    icon: Image,
    component: PicturesPage,
    layout: "/admin",
    auth: true
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    auth: true
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    auth: true
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
    auth: true
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
    auth: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    auth: true
  },
  {
    url: "/login",
    name: "Admin panel",
    rtlName: "لوحة الادارة",
    component: Login,
    layout: "/main",
  },
  {
    url: "/start-page",
    name: "Start Page",
    rtlName: "لوحة الادارة",
    component: StartPage,
    layout: "/main",
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
    auth: true
  }
];

export default dashboardRoutes;

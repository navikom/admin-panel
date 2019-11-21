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
  Apps,
  Build as BuildIcon
} from "@material-ui/icons";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import EventsUsersListPage from "views/Events/UsersList";
// import EventsUserPage from "views/Events/UsersItem";
// import PicturesPage from "views/pixart/Pictures/Pictures.jsx";
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";
// import AppsList from "views/AppsList/AppsList.tsx";
// import Typography from "views/Typography/Typography.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import Login from "views/Login/Login.tsx";
// import SignUp from "views/SignUp/SignUp.tsx";
// import StartPage from "views/StartPage/StartPage.tsx";
// import NotificationsPage from "views/Notifications/Notifications.jsx";
// import Guide from "views/Guide/Guide.jsx";
// import Build from "views/Build/Build.jsx";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.jsx";
import { lazy } from "utils";

const DashboardPage = lazy(() => import("views/Dashboard/Dashboard"));
const EventsUsersListPage = lazy(() => import("views/Events/UsersList"));
const EventsUserPage = lazy(() => import("views/Events/UsersItem"));
const PicturesPage = lazy(() => import("views/pixart/Pictures/Pictures"));
const UserProfile = lazy(() => import("views/UserProfile/UserProfile"));
const TableList = lazy(() => import("views/TableList/TableList"));
const AppsList = lazy(() => import("views/AppsList/AppsList"));
const Typography = lazy(() => import("views/Typography/Typography"));
const Icons = lazy(() => import("views/Icons/Icons"));
const Maps = lazy(() => import("views/Maps/Maps"));
const Login = lazy(() => import("views/Login/Login"));
const SignUp = lazy(() => import("views/SignUp/SignUp"));
const StartPage = lazy(() => import("views/StartPage/StartPage"));
const NotificationsPage = lazy(() => import("views/Notifications/Notifications"));
const Guide = lazy(() => import("views/Guide/Guide"));
const SettingsPage = lazy(() => import("views/Guide/Guide"));
const Build = lazy(() => import("views/Build/Build"));
// core components/views for RTL layout
const RTLPage = lazy(() => import("views/RTLPage/RTLPage"));

const dashboardRoutesMap = {
  guide: {
    path: "/guide",
    name: "Guide",
    rtlName: "يرشد",
    icon: CastForEducation,
    component: Guide,
    layout: "/admin",
    auth: true
  },
  build: {
    path: "/build",
    name: "Build",
    rtlName: "يرشد",
    icon: BuildIcon,
    component: Build,
    layout: "/admin",
    auth: true
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    auth: true
  },
  eventsUsers: {
    path: "/events-users",
    name: "Events Users List",
    rtlName: "لوحة القيادة",
    icon: People,
    component: EventsUsersListPage,
    layout: "/admin",
    auth: true
  },
  eventsUser: {
    url: "/events-users",
    params: "/:userId",
    name: "Events User",
    rtlName: "لوحة القيادة",
    icon: People,
    component: EventsUserPage,
    layout: "/admin",
    auth: true
  },
  apps: {
    path: "/apps",
    name: "Applications",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Apps,
    component: AppsList,
    layout: "/admin",
    auth: true
  },
  userProfile: {
    path: "/profile_user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    auth: true
  },
  pictures: {
    path: "/pictures",
    name: "Pictures",
    rtlName: "لوحة القيادة",
    icon: Image,
    component: PicturesPage,
    layout: "/admin",
    auth: true
  },
  table: {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
    auth: true
  },
  typography: {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    auth: true
  },
  icons: {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
    auth: true
  },
  maps: {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
    auth: true
  },
  notifications: {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    auth: true
  },
  login: {
    path: "/login",
    name: "login",
    rtlName: "لوحة الادارة",
    component: Login,
    layout: "/main",
  },
  signup: {
    path: "/sign-up",
    name: "Sign up",
    rtlName: "لوحة الادارة",
    component: SignUp,
    layout: "/main",
  },
  startPage: {
    path: "/start-page",
    name: "Start Page",
    rtlName: "لوحة الادارة",
    component: StartPage,
    layout: "/main",
  },
  startPageMain: {
    path: "/",
    name: "Start Page",
    rtlName: "لوحة الادارة",
    component: StartPage,
    layout: "/main",
  },
  rtl: {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
    auth: true
  }
};

export const mainNavRoutes = [
  dashboardRoutesMap.login
];

export default Object.values(dashboardRoutesMap);

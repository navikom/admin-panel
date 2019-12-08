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
  Build as BuildIcon,
  ListAltOutlined
} from "@material-ui/icons";

import { lazy } from "utils";
import { ADMIN_ROUTE, SIDEBAR_APPLICATION, SIDEBAR_MAIN, SIDEBAR_OTHER, SIDEBAR_USER } from "models/Constants";
import { IRoute } from "interfaces/IRoute";

const DashboardPage = lazy(() => import("views/Dashboard/Dashboard"));
const EventsUsersListPage = lazy(() => import("views/Events/UsersList"));
const EventsUserPage = lazy(() => import("views/Events/UsersItem"));
const PicturesPage = lazy(() => import("views/pixart/Pictures/Pictures"));
const UserProfile = lazy(() => import("views/UserProfile/UserProfile"));
const TableList = lazy(() => import("views/TableList/TableList"));
const AppsList = lazy(() => import("views/AppsList/AppsList"));
const AppsItem = lazy(() => import("views/AppsList/AppsItem"));
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
const RTLPage = lazy(() => import("views/RTLPage/RTLPage.tsx"));

const dashboardRoutesMap = {
  guide: {
    path: "/guide",
    name: "Guide",
    rtlName: "يرشد",
    icon: CastForEducation,
    component: Guide,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  build: {
    path: "/build",
    name: "Build",
    rtlName: "يرشد",
    icon: BuildIcon,
    component: Build,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_MAIN
  },
  eventsUsers: {
    path: "/events-users",
    name: "Events Users List",
    rtlName: "لوحة القيادة",
    icon: People,
    component: EventsUsersListPage,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_MAIN
  },
  eventsUser: {
    url: "/events-users",
    params: "/:userId",
    name: "Events User",
    rtlName: "لوحة القيادة",
    icon: People,
    component: EventsUserPage,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_MAIN
  },
  apps: {
    path: "/apps",
    name: "Applications",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Apps,
    component: AppsList,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_MAIN
  },
  userProfile: {
    path: "/profile_user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_USER
  },
  table: {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  typography: {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  icons: {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  maps: {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  notifications: {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: ADMIN_ROUTE,
    auth: true,
    category: SIDEBAR_OTHER
  },
  login: {
    path: "/login",
    name: "login",
    rtlName: "لوحة الادارة",
    component: Login,
    layout: "/main"
  },
  signup: {
    path: "/sign-up",
    name: "Sign up",
    rtlName: "لوحة الادارة",
    component: SignUp,
    layout: "/main"
  },
  startPage: {
    path: "/start-page",
    name: "Start Page",
    rtlName: "لوحة الادارة",
    component: StartPage,
    layout: "/main"
  },
  startPageMain: {
    path: "/",
    name: "Start Page",
    rtlName: "لوحة الادارة",
    component: StartPage,
    layout: "/main"
  },
  rtl: {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
    auth: true,
    category: SIDEBAR_OTHER
  }
};

const appItem = {
  url: "/apps",
  params: "/:appId",
  name: "Common",
  rtlName: "لوحة القيادة",
  component: AppsItem,
  layout: ADMIN_ROUTE,
  auth: true,
  category: SIDEBAR_APPLICATION
};

export const appRoutes: {[key: string]: IRoute[]} = {
  common: [
    appItem,
    {
      ...appItem,
      params: "/:appId/:pageName"
    }
  ],
  "1": [
    {
      ...appItem,
      path: "/apps/1",
      params: undefined,
      url: undefined,
      icon: ListAltOutlined
    },
    {
      ...appItem,
      path: "/apps/1/pictures",
      params: undefined,
      url: undefined,
      name: "Pictures",
      rtlName: "لوحة القيادة",
      icon: Image,
    }
  ],
  "2": [
    {
      ...appItem,
      path: "/apps/2",
      params: undefined,
      url: undefined,
      icon: ListAltOutlined
    }
  ],
  "11": [
    {
      ...appItem,
      path: "/apps/11",
      params: undefined,
      url: undefined,
      icon: ListAltOutlined
    }
  ]
};

export const mainNavRoutes = [
  dashboardRoutesMap.login
];

export default Object.values(dashboardRoutesMap);

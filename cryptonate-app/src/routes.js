import AllPolls from "./views/AllPolls";
import ChooseCharity from "./views/ChooseCharity";
import Donate from "./views/Donate";
import RecentActivity from "./views/RecentActivity";
import RequestFunds from "./views/RequestFunds";
import LandingPage from "./views/LandingPage";
import SignupPage from "./views/SignupPage";

export const privateRoutes = [
  {
    name: "Recent Activity",
    element: RecentActivity,
    path: "/recentactivity",
    sideBar: true,
    userType: ["charity"],
  },
  {
    name: "All Polls",
    element: AllPolls,
    path: "/allpolls",
    sideBar: true,
    userType: ["donor", "charity"],
  },
  // {
  //   name: "All Activity",
  //   element: RecentActivity,
  //   path: "/allactivity",
  //   sideBar: true,
  //   userType: ["donor", "charity"],
  // },
  {
    name: "Donate",
    element: Donate,
    path: "/donate",
    sideBar: true,
    userType: ["donor"],
  },
  {
    name: "Choose Charity",
    element: ChooseCharity,
    path: "/choosecharity",
    sideBar: false,
    userType: ["donor"],
  },
  {
    name: "Request Funds",
    element: RequestFunds,
    path: "/requestfunds",
    sideBar: true,
    userType: ["charity"],
  },
];

export const publicRoutes = [
  {
    name: "Signup Page",
    element: SignupPage,
    path: "/signup",
    sideBar: false,
  },
  {
    name: "Landing page",
    element: LandingPage,
    path: "/",
    sidebar: false,
  },
];

export const donorPages = ["Donate", "All Activity", "All Polls"];
export const charityPages = ["Request Funds", "All Activity", "All Polls"];

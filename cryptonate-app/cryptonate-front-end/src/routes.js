import AllPolls from "./views/AllPolls";
import ChooseCharity from "./views/ChooseCharity";
import Donate from "./views/Donate";
import RecentActivity from "./views/RecentActivity";
import RequestFunds from "./views/RequestFunds";

export const privateRoutes = [
  {
    name: "All Polls",
    element: AllPolls,
    path: "/allpolls",
    sideBar: true,
    userType: ["donor", "charity"],
  },
  {
    name: "All Activity",
    element: RecentActivity,
    path: "/allactivity",
    sideBar: true,
    userType: ["donor", "charity"],
  },
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

export const donorPages = ["Donate", "All Activity", "All Polls"];
export const charityPages = ["Request Funds", "All Activity", "All Polls"];

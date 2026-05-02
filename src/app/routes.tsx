import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";

const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login })),
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard })),
);
const Income = lazy(() =>
  import("./pages/Income").then((module) => ({ default: module.Income })),
);
const Expenses = lazy(() =>
  import("./pages/Expenses").then((module) => ({ default: module.Expenses })),
);
const Budget = lazy(() =>
  import("./pages/Budget").then((module) => ({ default: module.Budget })),
);
const Reports = lazy(() =>
  import("./pages/Reports").then((module) => ({ default: module.Reports })),
);
const Profile = lazy(() =>
  import("./pages/Profile").then((module) => ({ default: module.Profile })),
);
const Support = lazy(() =>
  import("./pages/Support").then((module) => ({ default: module.Support })),
);

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "income", Component: Income },
      { path: "expenses", Component: Expenses },
      { path: "budget", Component: Budget },
      { path: "reports", Component: Reports },
      { path: "profile", Component: Profile },
      { path: "support", Component: Support },
    ],
  },
]);

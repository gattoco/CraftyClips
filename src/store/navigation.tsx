import { lazy } from "solid-js";

const App = lazy(() => import("../components/App"));
const Clips = lazy(() => import("../components/Clips"));
const ClipManager = lazy(() => import("../components/ClipManager"));
const ClipQueue = lazy(() => import("../components/ClipQueue"));

export const pages: Page[] = [
  {
    name: "Home",
    url: "/",
    component: App,
  },
  {
    name: "Clips",
    url: "clips",
    component: Clips,
    children: [
      {
        name: "Library",
        url: "library",
        component: Clips,
      },
      {
        name: "Clip Manager",
        url: "clipmanager",
        component: ClipManager,
      },
      {
        name: "Clip Queue",
        url: "clipmanager/:id",
        component: ClipQueue,
        hidden: true,
      },
    ],
  },
];

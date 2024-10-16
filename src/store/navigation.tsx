import { lazy } from "solid-js";

// Lazy load components to improve performance
const App = lazy(() => import("../components/App"));
const ClipManager = lazy(() => import("../components/ClipManager"));
const ClipQueue = lazy(() => import("../components/ClipQueue"));

const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";


export const pages = [
  {
    name: "Home",
    url: base,
    component: App,
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
    hidden: true
  },
];

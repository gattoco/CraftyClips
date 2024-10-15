import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import App from "./components/App";
import ClipManager from "./components/ClipManager";
import { ContextProvider } from "./store";

const root = document.getElementById("root");

// Determine the base path based on the environment
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

render(
  () => (
    <ContextProvider>
      <Router base={base}>
          <Route path="/" component={App} />
          <Route path="/clipmanager" component={ClipManager} />
      </Router>
    </ContextProvider>
  ),
  root!
);

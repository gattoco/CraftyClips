import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import App from "./components/App";
import ClipManager from "./components/ClipManager";
import { ContextProvider } from "./store";

const root = document.getElementById("root");

render(
  () => (
    <ContextProvider>
      <Router>
        <Route path="/" component={App} />
        <Route path="/clipmanager" component={ClipManager} />
      </Router>
    </ContextProvider>
  ),
  root!
);

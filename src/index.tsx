import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import App from "./components/App";
import BRBScene from "./components/BRBScene";
import { ContextProvider } from "./store";

const root = document.getElementById("root");

render(
  () => (
    <ContextProvider>
      <Router>
        <Route path="/" component={App} />
        <Route path="/brbscene" component={BRBScene} />
      </Router>
    </ContextProvider>
  ),
  root!
);

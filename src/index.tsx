import { For, render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import { pages } from "./store/navigation";
import { ContextProvider } from "./store";

const root = document.getElementById("root");
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

render(
  () => (
    <ContextProvider>
      <nav class="nav-bar">
        <For each={pages}>
          {(page) => (
            <a href={page.url} class="nav-link mr-2">
              {page.name}
            </a>
          )}
        </For>
      </nav>
      <Router base={base}>
        <For each={pages}>
          {(page) => <Route path={page.url} component={page.component} />}
        </For>
      </Router>
    </ContextProvider>
  ),
  root!
);

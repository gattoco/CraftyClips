import { For, render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./index.css";
import { pages } from "./store/navigation";
import { ContextProvider } from "./store";

const root = document.getElementById("root");
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

const App = (props: any) => (
  <>
    <header>Crafty Clips</header>
    <aside>
      <nav>
      <For each={pages.filter((page) => !page.hidden)}>
        {(page) => (
            <A href={`${page.url}`} class="nav-link mr-2">
              {page.name}
            </A>
          )}
        </For>
      </nav>
    </aside>

    <main>{props.children}</main>
  </>
);

render(
  () => (
    <ContextProvider>
      <Router base={base} root={App}>
        <For each={pages}>
          {(page) => <Route path={page.url} component={page.component} />}
        </For>
      </Router>
    </ContextProvider>
  ),
  root!
);

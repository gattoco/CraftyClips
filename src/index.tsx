import { For, render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./index.css";
import { pages } from "./store/navigation";
import { ContextProvider } from "./store";
import Layout from "./components/Layout"; 

const root = document.getElementById("root");
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

const LayoutWrapper = (layout: string = "default", Component: any) => {
  return (props: any) => {
    if (layout === "default") {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    } else {
      return <Component {...props} />; 
    }
  };
};

render(
  () => (
    <ContextProvider>
      <Router base={base}>
        <For each={pages}>
          {(page) => (
            <>
              <Route path={page.url} component={LayoutWrapper(page.layout, page.component)} />
              <For each={page.children ?? []}>
                {(child) => (
                  <Route
                    path={`${page.url}/${child.url}`}
                    component={LayoutWrapper(child.layout, child.component)}
                  />
                )}
              </For>
            </>
          )}
        </For>
      </Router>
    </ContextProvider>
  ),
  root!
);

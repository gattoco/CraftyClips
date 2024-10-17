import { For, render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./index.css";
import { pages } from "./store/navigation";
import { ContextProvider, useState } from "./store";
import { fetchClips } from "./components/util";
import { onMount } from "solid-js";
import { getTwitchAuthToken } from "./store/config";

const root = document.getElementById("root");
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

const App = (props: any) => {
  const { state, setState } = useState();

    // Function to check if the clips need refreshing
    const checkClipsLastUpdated = async () => {
      const ONE_HOUR = 3600 * 1000; // 1 hour in milliseconds
      const lastUpdated = state.clipsUpdated;
  
      if (!lastUpdated || Date.now() - lastUpdated > ONE_HOUR) {
        const clips = await fetchClips(); // Fetch clips if it's been more than an hour
        if (clips) {
          setState("clips", clips);
        }
        setState("clipsUpdated", Date.now()); // Store the current timestamp
      } 
    };
  
    // Run the check on app load
    onMount(async () => {
      checkClipsLastUpdated();
    });
  
  return (
    <div class="h-screen flex flex-col">
      <header class="bg-gray-800 text-white p-4 text-xl font-bold">
        Crafty Clips
      </header>

      <div class="flex flex-1">
        <aside class="w-64 bg-gray-100 p-4">
          <nav class="space-y-4">
            <For each={pages.filter((page) => !page.hidden)}>
              {(page) => (
                <>
                  {/* Check if the page has a URL to decide if it should be a link or just a heading */}
                  {!page.children ? (
                    <A href={`${page.url}`} end={page.url === "/"} class="block p-2 rounded hover:bg-gray-200">
                      {page.name}
                    </A>
                  ) : (
                    <A href={`${page.url}/${page.children?.[0].url}`} class="block p-2 rounded hover:bg-gray-200">
                      {page.name}
                    </A>
                  )}

                  {/* Render children if present */}
                  <For each={page.children?.filter((page) => !page.hidden) ?? []}>
                    {(child) => (
                      <A href={`${page.url}/${child.url}`} class="block ml-4 p-2 rounded hover:bg-gray-200">
                        {child.name}
                      </A>
                    )}
                  </For>
                </>
              )}
            </For>
          </nav>
        </aside>

        <main class="flex-1 p-4 bg-white overflow-auto">{props.children}</main>
      </div>
    </div>
  );
};



render(
  () => (
    <ContextProvider>
      <Router base={base} root={App}>
        <For each={pages}>
          {(page) => (
            <>
              <Route path={page.url} component={page.component} />
              <For each={page.children ?? []}>
                {(child) => <Route path={`${page.url}/${child.url}`} component={child.component} />}
              </For>
            </>
          )}
        </For>
      </Router>
    </ContextProvider>
  ),
  root!
);

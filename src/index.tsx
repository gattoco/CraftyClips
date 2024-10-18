import { For, render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";
import "./index.css";
import { pages } from "./store/navigation";
import { ContextProvider, useState, INITIAL_STATE } from "./store";
import { fetchClips } from "./components/util";
import { createEffect, onCleanup, onMount } from "solid-js";
import { getTwitchAuthToken } from "./store/config";

const root = document.getElementById("root");
const base = import.meta.env.MODE === "github-pages" ? "/CraftyClips" : "/";

const App = (props: any) => {
  const { state, setState } = useState();

  const checkClipsLastUpdated = async () => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setState(parsedState);
    }

    const ONE_HOUR = 3600 * 1000;
    const lastUpdated = state.clipsUpdated;

    if (!lastUpdated || Date.now() - lastUpdated > ONE_HOUR) {
      const [clips, cursor] = await fetchClips(
        state.broadcaster_id,
        50,
        state.clipsCursor
      );

      if (clips) {
        setState((prevState) => ({
          clipsCursor: cursor,
          clips: [...prevState.clips, ...clips],
          clipsUpdated: Date.now(),
        }));
      }
    }
  };

  const saveStateToLocalStorage = () => {
    localStorage.setItem("state", JSON.stringify(state));
  };

  onMount(() => {
    checkClipsLastUpdated();

    window.addEventListener("beforeunload", saveStateToLocalStorage);

    onCleanup(() => {
      window.removeEventListener("beforeunload", saveStateToLocalStorage);
      saveStateToLocalStorage();
    });
  });

  return (
    <div class="h-screen flex flex-col">
      <header class="bg-gray-800 text-white p-4 text-xl font-bold">
        Crafty Clips
        <button
          class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.clear();
            setState(INITIAL_STATE);
            window.location.reload();
          }}
        >
          Reset State
        </button>
      </header>

      <div class="flex flex-1">
        <aside class="w-64 bg-gray-100 p-4">
          <nav class="space-y-4">
            <For each={pages.filter((page) => !page.hidden)}>
              {(page) => (
                <>
                  {!page.children ? (
                    <A
                      href={`${page.url}`}
                      end={page.url === "/"}
                      class="block p-2 rounded hover:bg-gray-200"
                    >
                      {page.name}
                    </A>
                  ) : (
                    <A
                      href={`${page.url}/${page.children?.[0].url}`}
                      class="block p-2 rounded hover:bg-gray-200"
                    >
                      {page.name}
                    </A>
                  )}

                  <For
                    each={page.children?.filter((page) => !page.hidden) ?? []}
                  >
                    {(child) => (
                      <A
                        href={`${page.url}/${child.url}`}
                        class="block ml-4 p-2 rounded hover:bg-gray-200"
                      >
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
                {(child) => (
                  <Route
                    path={`${page.url}/${child.url}`}
                    component={child.component}
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

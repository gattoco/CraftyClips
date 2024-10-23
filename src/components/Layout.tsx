// components/DefaultLayout.tsx
import { For } from "solid-js";
import { pages } from "../store/navigation";
import { A } from "@solidjs/router";

const Layout = (props: any) => {
  return (
    <div class="h-screen flex flex-col">
      <header class="bg-gray-800 text-white p-4 text-xl font-bold">
        Crafty Clips
        <button
          class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => {
            localStorage.clear();
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

export default Layout;

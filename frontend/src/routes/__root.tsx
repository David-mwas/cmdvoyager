import { Outlet, createRootRouteWithContext, HeadContent, Link } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";

interface RouterContext {
  queryClient: QueryClient;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-card rounded-2xl p-10">
        <div className="text-6xl mb-2">🌌</div>
        <h1 className="text-5xl font-bold text-gradient">404</h1>
        <h2 className="mt-3 text-xl font-semibold">Lost in space</h2>
        <p className="mt-2 text-sm text-muted-foreground">This sector of the galaxy doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-cosmic px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Return to base
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CmdVoyager — Your terminal command galaxy" },
      {
        name: "description",
        content:
          "Save, search, and reuse your favorite terminal commands. A gamified command storage platform for developers.",
      },
      { property: "og:title", content: "CmdVoyager — Your terminal command galaxy" },
      { property: "og:description", content: "Gamified command storage for developers." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

import { Toaster } from "@/components/ui/sonner";

function RootComponent() {
  return (
    <>
      <HeadContent />
      {/* Dynamic Shooting Stars Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] right-[20%] w-[100px] h-[2px] bg-gradient-to-r from-transparent via-white to-white animate-shooting-star" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[30%] right-[10%] w-[100px] h-[2px] bg-gradient-to-r from-transparent via-white to-white animate-shooting-star" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-[5%] right-[40%] w-[100px] h-[2px] bg-gradient-to-r from-transparent via-stardust to-stardust animate-shooting-star" style={{ animationDelay: '6s' }}></div>
      </div>
      <div className="relative z-10 min-h-screen w-full">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-8 w-full max-w-full">
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
              <div className="space-y-3 text-center">
                <div className="mx-auto h-12 w-12 rounded-full border-4 border-secondary/30 border-t-secondary animate-spin" />
                <p className="text-base font-semibold">Loading SpendSmart...</p>
              </div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </DataProvider>
    </ThemeProvider>
  );
}

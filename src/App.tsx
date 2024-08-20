import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./global.css"
import { ThemeProvider } from "./components/theme/theme-provider";


export function App() {

  return (  
      <HelmetProvider>
        <ThemeProvider storageKey="gym-bud-theme" defaultTheme="dark">
          <Helmet titleTemplate="GymBud" /> 
            <Toaster richColors closeButton/>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}/>
            </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
  )
}

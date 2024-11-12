import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Third Libs Imports
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

// Application Routes Import
import { appRoutes } from './routes';

const router = createBrowserRouter(appRoutes);

export const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
}

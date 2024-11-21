import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { Provider } from "react-redux";
import { persist, store } from "./store/store";
import { Toaster } from "./components/ui/toaster";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persist}>
        <RouterProvider router={router} />
      </PersistGate>

      <Toaster />
    </Provider>
  </StrictMode>
);

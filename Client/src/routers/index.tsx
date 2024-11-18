import App from "@/App";
import CartPage from "@/pages/CartPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SearchPage from "@/pages/SearchPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout wraps all pages
    children: [
      { path: "/", element: <Home /> },
      { path: "search", element: <SearchPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;

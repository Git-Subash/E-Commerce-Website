import App from "@/App";
import AddressPage from "@/pages/AddressPage";
import CartPage from "@/pages/CartPage";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OrdersPage from "@/pages/OrdersPage";
import OtpVerification from "@/pages/OtpVerification";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import SearchPage from "@/pages/SearchPage";
import VerfiyEmail from "@/pages/VerfiyEmail";
import { createBrowserRouter } from "react-router-dom";
import Profile from "@/layouts/Profile";
import ProfilePage from "@/pages/ProfilePage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />, // Layout wraps all pages
      children: [
        { path: "", element: <Home /> },
        { path: "search", element: <SearchPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "verify-forgot-password-otp", element: <OtpVerification /> },
        { path: "reset-password", element: <ResetPassword /> },
        {
          path: "/profile-page",
          element: <Profile />,
          children: [
            { path: "user-details", element: <ProfilePage /> },
            { path: "order-details", element: <OrdersPage /> },
            { path: "address-details", element: <AddressPage /> },
          ],
        },
      ],
    },
    {
      path: "/verify-email",
      element: <VerfiyEmail />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

export default router;

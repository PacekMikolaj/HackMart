import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { userRoutes } from "../features/user/user.routes";
import { productRoutes } from "../features/product/product.routes";
import { AdminRoutes } from "../features/admin/admin.routes";
import { cartRoutes } from "../features/cart/cart.routes";
import AppLayout from "../components/AppLayout";
import HomePage from "../components/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      ...userRoutes,
      ...productRoutes,
      ...AdminRoutes,
      ...cartRoutes,
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

import { RouteObject } from "react-router-dom";
// import RequireAuth from "../../router/RequireAuth";
import CartPage from "./pages/CartPage";

console.log("CartPage", CartPage);

export const cartRoutes: RouteObject[] = [
  {
    path: "/cart",
    element: <CartPage />,
  },
];

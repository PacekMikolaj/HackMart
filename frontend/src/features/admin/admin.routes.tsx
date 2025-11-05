import { RouteObject } from "react-router-dom";
import RequireAuth from "../../router/RequireAuth";
import AdminPanel from "./pages/AdminPanel";
import { Outlet } from "react-router-dom";
import ProductsPanel from "./pages/ProductsPanel";
import ProductPanel from "./pages/ProductPanel";
import { addProduct, updateProduct } from "../../api/product";

export const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <AdminPanel />,
      },
      {
        path: "products",
        element: <ProductsPanel />,
      },
      {
        path: "products/:id/edit",
        element: <ProductPanel fetchFunction={updateProduct} />,
      },
      {
        path: "products/add",
        element: <ProductPanel fetchFunction={addProduct} />,
      },
    ],
  },
];

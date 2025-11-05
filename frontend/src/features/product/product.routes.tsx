import { RouteObject } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductsPage from "./pages/ProductsPage";
import { fetchProducts } from "../../api/product";

function ProductsRouteWrapper() {
  const { t } = useTranslation();
  return <ProductsPage fetchProducts={fetchProducts} label={t("product.productsCatalog")} />;
}

export const productRoutes: RouteObject[] = [
  {
    path: "/products",
    element: <ProductsRouteWrapper />,
  },
];
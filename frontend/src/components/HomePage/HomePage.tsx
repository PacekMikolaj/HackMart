import React from "react";
import Partners from "../Partners";
import  ProductsPage  from "../../features/product/pages/ProductsPage";
import { fetchRecommendedProducts } from "../../api/product";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <ProductsPage
        fetchProducts={fetchRecommendedProducts}
        label={t("product.recommendations")}
      />
      <Partners />
    </div>
  );
};

export default HomePage;

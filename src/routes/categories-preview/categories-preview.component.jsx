import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";

import "./categories.styles.scss";

import CategoryPreview from "../../components/category-preview/category-preview.component";
const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        console.log(products);
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;

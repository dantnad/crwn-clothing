import { useContext, useState, useEffect, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {
  CategoryContainer,
  CategoryHeader,
  CategoryTitle,
  TitleDecoration,
} from "./category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryHeader>
        <Link to="/shop">&#10094; GO BACK</Link>
        <CategoryTitle>
          – <TitleDecoration>{category.toUpperCase()}</TitleDecoration> –
        </CategoryTitle>
      </CategoryHeader>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;

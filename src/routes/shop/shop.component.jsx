import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  const categoryEntries = Object.entries(categoriesMap);
  console.log(categoryEntries);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {/* {categoryEntries.map((category) => {
              const [title, products] = category;
              return <CategoryPreview title={title} products={products} />;
            })} */}
            {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;

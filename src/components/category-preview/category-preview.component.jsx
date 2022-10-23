import ProductCard from "../product-card/";

const CategoryPreview = ({ title, products }) => {
  const filteredProducts = products.slice(0, 9);

  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      {filteredProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default CategoryPreview;

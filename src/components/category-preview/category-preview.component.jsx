import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  CategoryPreviewTitle,
  CategoryPreviewCards,
} from "./category-preview.styles.jsx";
import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <CategoryPreviewTitle>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </CategoryPreviewTitle>
      <CategoryPreviewCards>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryPreviewCards>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

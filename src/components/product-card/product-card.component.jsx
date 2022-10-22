//React Imports
import { useContext } from "react";
//Component Imports
import Button from "../button/button.component";
//Context Imports
import { CartContext } from "../../context/cart.context";
//Stylesheet import
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, id } = product;
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        onClick={() => {
          addItemToCart({
            id,
            price,
            imageUrl,
            name,
          });
        }}
        buttonType="inverted"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;

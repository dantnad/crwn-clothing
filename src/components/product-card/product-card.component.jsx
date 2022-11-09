//React Imports
import { useContext } from "react";
//Component Imports
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
//Context Imports
import { CartContext } from "../../context/cart.context";
//Stylesheet import
import {
  ProductCardContainer,
  ProductImage,
  ProductFooter,
  ProductName,
  ProductPrice,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, id } = product;
  const { updateCartItems } = useContext(CartContext);

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductFooter>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </ProductFooter>
      <Button
        onClick={() => {
          updateCartItems(
            {
              id,
              price,
              imageUrl,
              name,
            },
            "ADD_TO_CART"
          );
        }}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;

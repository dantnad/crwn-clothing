//Component Imports
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
//Context Imports
import {
  ProductCardContainer,
  ProductImage,
  ProductFooter,
  ProductName,
  ProductPrice,
} from "./product-card.styles.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.actions";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl, id } = product;
  const cartItems = useSelector(selectCartItems);

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductFooter>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price}</ProductPrice>
      </ProductFooter>
      <Button
        onClick={() =>
          dispatch(
            addItemToCart(cartItems, {
              id,
              price,
              imageUrl,
              name,
            })
          )
        }
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;

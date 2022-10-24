import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import {
  CheckoutItemContainer,
  CheckoutItemImage,
  CheckoutRemove,
  CheckoutArrow,
  CheckoutItemCount,
  CheckoutItemData,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ product }) => {
  const { imageUrl, name, quantity, price } = product;
  const { addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(product);
  const decreaseItemHandler = () => decreaseItemFromCart(product);
  const removeItemHandler = () => removeItemFromCart(product);

  return (
    <CheckoutItemContainer>
      <CheckoutItemImage>
        <img src={imageUrl} alt={name} />
      </CheckoutItemImage>
      <CheckoutItemData>{name}</CheckoutItemData>
      <CheckoutItemData>
        <CheckoutArrow onClick={decreaseItemHandler}>&#10094;</CheckoutArrow>
        <CheckoutItemCount>{` ${quantity} `}</CheckoutItemCount>
        <CheckoutArrow onClick={addItemHandler}>&#10095;</CheckoutArrow>
      </CheckoutItemData>
      <CheckoutItemData>{price}</CheckoutItemData>
      <CheckoutRemove>
        <Button buttonType="inverted" onClick={removeItemHandler}>
          &#10006;
        </Button>
      </CheckoutRemove>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

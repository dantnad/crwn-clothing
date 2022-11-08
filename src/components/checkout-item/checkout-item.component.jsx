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
  const { updateCartItems } = useContext(CartContext);

  const addItemHandler = () => updateCartItems(product, "ADD_TO_CART");
  const decreaseItemHandler = () =>
    updateCartItems(product, "REDUCE_ITEM_COUNT");
  const removeItemHandler = () => updateCartItems(product, "REMOVE_FROM_CART");

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

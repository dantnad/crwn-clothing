import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  reduceItemFromCart,
} from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";
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
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { imageUrl, name, quantity, price } = product;

  const addItemHandler = () => dispatch(addItemToCart(cartItems, product));
  const decreaseItemHandler = () =>
    dispatch(reduceItemFromCart(cartItems, product));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, product));

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

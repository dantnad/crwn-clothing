import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  CartIconContainer,
  ShoppingIconStyled,
  ShoppingItemIconCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({ ...otherProps }) => {
  const { itemCount } = useContext(CartContext);

  return (
    <CartIconContainer {...otherProps}>
      <ShoppingIconStyled className="shopping-icon" />
      <ShoppingItemIconCount className="item-count">
        {itemCount}
      </ShoppingItemIconCount>
    </CartIconContainer>
  );
};

export default CartIcon;

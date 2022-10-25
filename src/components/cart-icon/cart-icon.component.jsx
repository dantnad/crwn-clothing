import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  CartIconContainer,
  ShoppingIcon,
  ShoppingItemIconCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({ ...otherProps }) => {
  const { itemCount } = useContext(CartContext);

  return (
    <CartIconContainer {...otherProps}>
      <ShoppingIcon className="shopping-icon" />
      <ShoppingItemIconCount className="item-count">
        {itemCount}
      </ShoppingItemIconCount>
    </CartIconContainer>
  );
};

export default CartIcon;

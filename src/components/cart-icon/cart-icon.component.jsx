import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cart.selector";
import {
  CartIconContainer,
  ShoppingIcon,
  ShoppingItemIconCount,
} from "./cart-icon.styles.jsx";

const CartIcon = ({ ...otherProps }) => {
  const itemCount = useSelector(selectCartCount);

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

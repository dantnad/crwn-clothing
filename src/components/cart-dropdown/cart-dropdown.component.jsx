import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartDropdownEmptyMessage,
  CartDropdownItems,
  CartDropdownButton,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartDropdownItems>
        {cartItems ? null : (
          <CartDropdownEmptyMessage>
            Seems a bit empty, go shopping
          </CartDropdownEmptyMessage>
        )}
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CartDropdownItems>
      <Link to="/checkout">
        <CartDropdownButton>GO TO CHECKOUT</CartDropdownButton>
      </Link>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

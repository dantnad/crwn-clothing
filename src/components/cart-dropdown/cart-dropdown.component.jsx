import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import {
  CartDropdownContainer,
  CartDropdownEmptyMessage,
  CartDropdownItems,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartDropdownItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <CartDropdownEmptyMessage>
            Your cart is empty
          </CartDropdownEmptyMessage>
        )}
      </CartDropdownItems>
      <Link to="/checkout">
        <Button>Go to checkout</Button>
      </Link>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

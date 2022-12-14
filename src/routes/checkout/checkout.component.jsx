import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { Link } from "react-router-dom";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  Checkout,
  CheckoutTable,
  CheckoutHeader,
  CartEmpty,
  HeaderCell,
  CartTotal,
} from "./checkout.styles.jsx";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Checkout>
      <CheckoutTable>
        <CheckoutHeader>
          <HeaderCell>Product</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Quantity</HeaderCell>
          <HeaderCell>Price</HeaderCell>
          <HeaderCell>Remove</HeaderCell>
        </CheckoutHeader>

        {cartItems.map((item) => {
          return <CheckoutItem key={item.id} product={item} />;
        })}
      </CheckoutTable>
      {cartItems.length === 0 ? (
        <CartEmpty>
          <h2>Feels a bit empty here</h2>
          <Link to="/shop">Go shopping</Link>
        </CartEmpty>
      ) : null}
      <CartTotal>${cartTotal}</CartTotal>
    </Checkout>
  );
};

export default Cart;

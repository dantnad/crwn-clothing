import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { Link } from "react-router-dom";
import CheckoutItem from "../../components/checkout-item/checkout-item";
import "./cart.styles.scss";

const Cart = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <table>
        <tr className="checkout-header">
          <th className="header-block">Product</th>
          <th className="header-block">Description</th>
          <th className="header-block">Quantity</th>
          <th className="header-block">Price</th>
          <th className="header-block">Remove</th>
        </tr>

        {cartItems.map((item) => {
          return <CheckoutItem key={item.id} product={item} />;
        })}
      </table>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h2>Feels a bit empty here</h2>
          <Link to="/shop">Go shopping</Link>
        </div>
      ) : null}
      <div className="total">
        <span>${cartTotal}</span>
      </div>
    </div>
  );
};

export default Cart;

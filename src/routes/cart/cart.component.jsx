import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../../components/button/button.component";
import "./cart.styles.scss";

const Cart = () => {
  const { cartItems, addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);

  return (
    <div className="cart-container">
      <table>
        <tr>
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
        {cartItems.map((item) => {
          const { id, price, imageUrl, name, quantity } = item;
          return (
            <tr key={id} className="cart-item">
              <td>
                <img src={imageUrl} alt={name} />
              </td>
              <td>{name}</td>
              <td className="quantity-selector">
                <button
                  onClick={() => {
                    decreaseItemFromCart(item);
                  }}
                >
                  {"<"}
                </button>
                <span>{` ${quantity} `}</span>
                <button
                  onClick={() => {
                    addItemToCart(item);
                  }}
                >
                  {">"}
                </button>
              </td>
              <td>{price}</td>
              <td>
                <Button
                  onClick={() => {
                    removeItemFromCart(item);
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="cart-total">
        <span>
          $
          {cartItems.reduce(
            (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default Cart;

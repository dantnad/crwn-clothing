import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./checkout-item.scss";

const CheckoutItem = ({ product }) => {
  const { imageUrl, name, quantity, price } = product;
  const { addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);

  return (
    <tr className="checkout-item-container">
      <td className="image-container">
        <img className="" src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td className="quantity">
        <button
          className="arrow"
          onClick={() => {
            decreaseItemFromCart(product);
          }}
        >
          {"<"}
        </button>
        <span className="value">{` ${quantity} `}</span>
        <button
          className="arrow"
          onClick={() => {
            addItemToCart(product);
          }}
        >
          {">"}
        </button>
      </td>
      <td>{price}</td>
      <td className="remove">
        <Button
          buttonType="inverted"
          onClick={() => {
            removeItemFromCart(product);
          }}
        >
          X
        </Button>
      </td>
    </tr>
  );
};

export default CheckoutItem;

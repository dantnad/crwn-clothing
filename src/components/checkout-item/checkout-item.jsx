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
          &#8810;
        </button>
        <span className="value">{` ${quantity} `}</span>
        <button
          className="arrow"
          onClick={() => {
            addItemToCart(product);
          }}
        >
          &#8811;
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
          &#10006;
        </Button>
      </td>
    </tr>
  );
};

export default CheckoutItem;

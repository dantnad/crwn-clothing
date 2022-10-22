import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./checkout-item.scss";

const CheckoutItem = ({ product }) => {
  const { imageUrl, name, quantity, price } = product;
  const { addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(product);
  const decreaseItemHandler = () => decreaseItemFromCart(product);
  const removeItemHandler = () => removeItemFromCart(product);

  return (
    <tr className="checkout-item-container">
      <td className="image-container">
        <img className="" src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td className="quantity">
        <button className="arrow" onClick={decreaseItemHandler}>
          &#10094;
        </button>
        <span className="value">{` ${quantity} `}</span>
        <button className="arrow" onClick={addItemHandler}>
          &#10095;
        </button>
      </td>
      <td>{price}</td>
      <td className="remove">
        <Button buttonType="inverted" onClick={removeItemHandler}>
          &#10006;
        </Button>
      </td>
    </tr>
  );
};

export default CheckoutItem;

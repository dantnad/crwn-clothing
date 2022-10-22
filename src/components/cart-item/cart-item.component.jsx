import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <span>{`${quantity} x $${price}`}</span>
    </div>
  );
};

export default CartItem;

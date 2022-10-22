import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <h2 className="name">{name}</h2>
        <span>{`${quantity} x $${price}`}</span>
      </div>
    </div>
  );
};

export default CartItem;

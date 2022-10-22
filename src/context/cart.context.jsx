import { createContext, useState } from "react";

export const CartContext = createContext({
  cartVisibility: false,
  items: [],
  setCartVisibility: () => {},
});

const CartProvider = ({ children }) => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const value = { cartVisibility, setCartVisibility };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

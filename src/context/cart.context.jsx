import { createContext, useState } from "react";

export const CartContext = createContext({
  visibility: false,
  items: [],
  setVisibility: () => {},
});

const CartProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const value = { visibility, setVisibility };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

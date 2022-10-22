import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const exists = cartItems.some((item) => item.id === productToAdd.id);
  if (exists) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [
      ...cartItems,
      {
        ...productToAdd,
        quantity: 1,
      },
    ];
  }
};

export const CartContext = createContext({
  cartVisibility: false,
  cartItems: [],
  setCartVisibility: () => {},
  addItemToCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const value = {
    cartItems,
    addItemToCart,
    cartVisibility,
    setCartVisibility,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

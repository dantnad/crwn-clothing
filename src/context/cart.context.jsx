import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const { id, name, imageUrl, price } = productToAdd;
  const exists = cartItems.some((item) => item.id === productToAdd.id);
  const index = cartItems.findIndex((item) => item.id === productToAdd.id);
  if (!exists) {
    return [
      ...cartItems,
      {
        id,
        name,
        imageUrl,
        price,
        quantity: 1,
      },
    ];
  } else {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
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

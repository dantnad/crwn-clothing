import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd, callback) => {
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

const decreaseCartItem = (cartItems, productToDecrease) => {
  let newArray = cartItems.map((cartItem) => {
    if (cartItem.id === productToDecrease.id) {
      return {
        ...productToDecrease,
        quantity: productToDecrease.quantity - 1,
      };
    } else {
      return cartItem;
    }
  });

  newArray = newArray.filter((item) => {
    if (item.quantity === 0) {
      return false;
    } else {
      return true;
    }
  });
  return newArray;
};

const removeItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => {
    if (cartItem.id === productToRemove.id) {
      return false;
    } else {
      return true;
    }
  });
};

export const CartContext = createContext({
  cartVisibility: false,
  cartItems: [],
  itemCount: null,
  cartTotal: null,
  setCartVisibility: () => {},
  addItemToCart: () => {},
  setItemCount: () => {},
  setCartTotal: () => {},
});

const CartProvider = ({ children }) => {
  const [cartVisibility, setCartVisibility] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeItem(cartItems, product));
  };

  const decreaseItemFromCart = (product) => {
    setCartItems(decreaseCartItem(cartItems, product));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setItemCount(newCartCount);
    const newTotal = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0
    );
    setCartTotal(newTotal);
  }, [cartItems]);

  const value = {
    cartItems,
    cartTotal,
    addItemToCart,
    cartVisibility,
    setCartVisibility,
    itemCount,
    removeItemFromCart,
    decreaseItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

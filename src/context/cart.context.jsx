import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  cartItems: [],
  itemCount: 0,
  cartTotal: 0,
  cartVisibility: false,
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

const CART_ACTION_TYPES = {
  UPDATE_CART: "UPDATE_CART",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY",
};

//------------------- Helper functions -----------------------
//Remove from cart function
const removeFromCart = (cartItems, itemToRemove) => {
  const { id } = itemToRemove;
  const newCartItems = cartItems.filter((cartItem) =>
    cartItem.id === id ? false : true
  );
  return newCartItems;
};
//Add to cart function
const addToCart = (cartItems, itemToAdd) => {
  const { id } = itemToAdd;
  if (cartItems.some((item) => item.id === id)) {
    const newArray = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    return newArray;
  } else {
    const newArray = [
      ...cartItems,
      {
        ...itemToAdd,
        quantity: 1,
      },
    ];
    return newArray;
  }
};
//Decrease Items on cart function
const decreaseItemFromCart = (cartItems, itemToDecrease) => {
  const { id } = itemToDecrease;
  let newArray = cartItems.map((cartItem) =>
    cartItem.id === id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  newArray = newArray.filter((item) => {
    if (item.quantity) {
      return true;
    } else {
      return false;
    }
  });
  return newArray;
};

// Cart Item reducer
const cartItemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.UPDATE_CART: {
      return {
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPES.TOGGLE_VISIBILITY: {
      return {
        ...state,
        cartVisibility: !state.cartVisibility,
      };
    }
    default:
      throw new Error("Unhandled type on cartItemReducer");
  }
};

const CartProvider = ({ children }) => {
  const [{ cartItems, itemCount, cartTotal, cartVisibility }, dispatch] =
    useReducer(cartItemReducer, INITIAL_STATE);

  const updateCartItems = (product, action) => {
    switch (action) {
      case "ADD_TO_CART": {
        const newCartItems = addToCart(cartItems, product);
        const newItemCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        const newCartTotal = newCartItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );
        dispatch({
          type: "UPDATE_CART",
          payload: {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            itemCount: newItemCount,
          },
        });
        break;
      }
      case "REMOVE_FROM_CART": {
        const newCartItems = removeFromCart(cartItems, product);
        const newItemCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        const newCartTotal = newCartItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );
        dispatch({
          type: "UPDATE_CART",
          payload: {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            itemCount: newItemCount,
          },
        });
        break;
      }
      case "REDUCE_ITEM_COUNT": {
        const newCartItems = decreaseItemFromCart(cartItems, product);
        const newItemCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        const newCartTotal = newCartItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );
        dispatch({
          type: "UPDATE_CART",
          payload: {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            itemCount: newItemCount,
          },
        });
        break;
      }
      default:
        throw new Error("Unhandled action type in updateCartItems");
    }
  };

  const setCartVisibility = () => {
    dispatch({
      type: "TOGGLE_VISIBILITY",
    });
  };

  const value = {
    updateCartItems,
    cartItems,
    cartTotal,
    cartVisibility,
    setCartVisibility,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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
const decreaseFromCart = (cartItems, itemToDecrease) => {
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

export const addItemToCart = (cartItems, item) => {
  const newCartItems = addToCart(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, item) => {
  const newCartItems = removeFromCart(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const reduceItemFromCart = (cartItems, item) => {
  const newCartItems = decreaseFromCart(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setCartVisibility = (boolean) =>
  createAction(CART_ACTION_TYPES.TOGGLE_VISIBILITY, boolean);

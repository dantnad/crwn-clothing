import { CART_ACTION_TYPES } from "./cart.types";

const CART_INITIAL_STATE = {
  cartItems: [],
  cartVisibility: false,
};

export const cartItemReducer = (
  state = CART_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        cartItems: payload,
      };
    }
    case CART_ACTION_TYPES.TOGGLE_VISIBILITY: {
      return {
        ...state,
        cartVisibility: payload,
      };
    }
    default:
      return state;
  }
};

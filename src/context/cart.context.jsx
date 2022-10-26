import { createContext, useEffect, useReducer } from "react";

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

// Declaring diferent reducer possible states
const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  DECREASE_CART_COUNT: "DECREASE_CART_COUNT",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY",
};

// Cart Item reducer
const cartItemReducer = (state, action) => {
  //------------- BEGINNING OF THE CART REDUCER -----------------
  //Get the current state of the reducer
  const { cartItems, cartVisibility } = state;
  //Destructure action
  const { type, payload } = action;
  //Check if there was a payload with the triggering type
  if (payload) {
    //------------- ACTIONS WHEN PAYLOAD IS TRUE -----------------
    //If there is a payload, destructure the id of it
    const { id } = payload;
    //Check the type of the action that triggered the reducer
    switch (type) {
      //The user wants to remove an item from the cart
      case CART_ACTION_TYPES.REMOVE_FROM_CART: {
        //Create a new items array fitering out the matching id with the cart items
        const newCartItems = cartItems.filter((cartItem) => {
          if (cartItem.id === id) {
            return false;
          } else {
            return true;
          }
        });
        //Use the new cartItems array to calculate new item count
        const newItemCount = newCartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
        //Use the new cartItems array to calculate new cart total
        const newCartTotal = newCartItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );
        //Return new state containing the updated object
        return {
          cartItems: newCartItems,
          itemCount: newItemCount,
          cartTotal: newCartTotal,
          cartVisibility,
        };
      }
      //The user wants to add an item to the cart
      case CART_ACTION_TYPES.ADD_TO_CART: {
        //Check to see if there is already an item on the cart with the same Id
        if (cartItems.some((item) => item.id === id)) {
          //If an item sith the same ID exists then we increase its count
          const newItems = cartItems.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          //Create a new object based of this new items array with updated values
          const newObject = {
            ...state,
            cartItems: newItems,
            itemCount: newItems.reduce(
              (total, cartItem) => total + cartItem.quantity,
              0
            ),
            cartTotal: newItems.reduce(
              (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
              0
            ),
          };
          //Return the new object
          return newObject;
        } else {
          //If no item with the same ID exists then we add it to the array
          const newCartItems = [
            ...cartItems,
            {
              ...payload,
              quantity: 1,
            },
          ];
          // Create new updated object with updated values
          const newObject = {
            ...state,
            cartItems: newCartItems,
            itemCount: newCartItems.reduce(
              (total, cartItem) => total + cartItem.quantity,
              0
            ),
            cartTotal: newCartItems.reduce(
              (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
              0
            ),
          };
          //Return the new object
          return newObject;
        }
      }
      //The user wants to decrease an item from the cart
      case CART_ACTION_TYPES.DECREASE_CART_COUNT:
        // Create a new array filtering out the item that is being decreased
        let newArray = cartItems.map((cartItem) => {
          //When the id matches with the payload id
          if (cartItem.id === id) {
            //Return the item decreasign the item count
            return {
              ...payload,
              quantity: payload.quantity - 1,
            };
          } else {
            //Return every other item as is
            return cartItem;
          }
        });
        //Check if the item count is zero, if so, remove the item
        newArray = newArray.filter((item) => {
          if (item.quantity === 0) {
            return false;
          } else {
            return true;
          }
        });
        //Create the new object with the updated values
        const newObject = {
          ...state,
          cartItems: newArray,
          itemCount: newArray.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
          ),
          cartTotal: newArray.reduce(
            (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
            0
          ),
        };
        //Return and update the state
        return newObject;
      //If an unhandled state is given then we throw an error and stop execution
      default:
        throw new Error(
          `Unhandled type ${type} on CartContext with a payload that isn't undefined`
        );
    }
  } else {
    //------------- ACTIONS WHEN PAYLOAD IS FALSE -----------------
    //If the action does not contain a payload manage the states
    switch (type) {
      case CART_ACTION_TYPES.TOGGLE_VISIBILITY:
        return {
          ...state,
          //Return the oposite of the current value of cart visibility
          cartVisibility: !cartVisibility,
        };
      //If an unhandled type comes in, throw an error
      default:
        throw new Error(
          `Unhandled type ${type} in CartContext with no payload`
        );
    }
  }
  //------------- END OF THE CART REDUCER -----------------
};

const INITIAL_STATE = {
  cartItems: [],
  itemCount: 0,
  cartTotal: 0,
  cartVisibility: false,
};

const CartProvider = ({ children }) => {
  const [{ cartItems, itemCount, cartTotal, cartVisibility }, dispatch] =
    useReducer(cartItemReducer, INITIAL_STATE);

  const addItemToCart = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_TO_CART,
      payload: product,
    });
  };

  const removeItemFromCart = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_CART,
      payload: product,
    });
  };

  const decreaseItemFromCart = (product) => {
    dispatch({
      type: CART_ACTION_TYPES.DECREASE_CART_COUNT,
      payload: product,
    });
  };

  const setCartVisibility = () => {
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_VISIBILITY,
    });
  };

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

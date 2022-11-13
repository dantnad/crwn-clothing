// React imports
import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
//Selector imports
import { selectCartVisibility } from "../../store/cart/cart.selector";
import { setCartVisibility } from "../../store/cart/cart.actions";
// Component imports
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// Context Imports
import { selectCurrentUser } from "../../store/user/user.selector";
//Utils import
import { signOutUser } from "../../utils/firebase/firebase.utils";
// Stylesheet import
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  // Get information about the cart
  const cartVisibility = useSelector(selectCartVisibility);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {/* Check if a user is currently logged in using context and provide Sign in or Sign out options accordingly */}
          {currentUser ? (
            <NavLink
              as="span"
              onClick={async () => {
                try {
                  await signOutUser();
                } catch (error) {
                  console.error(
                    "There was an error logging out",
                    error.code,
                    error.messasge
                  );
                }
              }}
            >
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          {/* Cart Icon with an onclick listener to toggle Cart visibility */}
          <CartIcon
            onClick={() => dispatch(setCartVisibility(!cartVisibility))}
          />
        </NavLinks>
        {/* If the cartVisibility is true, show the dropdown */}
        {cartVisibility && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

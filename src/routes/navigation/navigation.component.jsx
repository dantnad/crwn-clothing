// React imports
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
// Component imports
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// Context Imports
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
//Utils import
import { signOutUser } from "../../utils/firebase/firebase.utils";
// Stylesheet import
import "./navigation.styles.scss";

const Navigation = () => {
  // Get information about the current user
  const { currentUser } = useContext(UserContext);
  // Get information about the cart
  const { cartVisibility, setCartVisibility } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link className="nav-logo" to="/">
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* Check if a user is currently logged in using context and provide Sign in or Sign out options accordingly */}
          {currentUser ? (
            <span
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
              className="nav-link"
            >
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          {/* Cart Icon with an onclick listener to toggle Cart visibility */}
          <CartIcon
            onClick={() => {
              // Toggle functionality for the cart icon and dropdown
              setCartVisibility(!cartVisibility);
            }}
          />
        </div>
        {/* If the cartVisibility is true, show the dropdown */}
        {cartVisibility && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

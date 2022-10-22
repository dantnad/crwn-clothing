import "./navigation.styles.scss";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { visibility, setVisibility } = useContext(CartContext);

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
          <CartIcon
            onClick={() => {
              setVisibility(!visibility);
            }}
          />
        </div>
        {visibility && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/api/user";
import SearcBox from "../searcBox/SearcBox";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logout(dispatch);
    navigate("/");
  };

  return (
    <header className="headerContainer">
      <nav className="navigatorContainer">
        <NavLink to="/" className="navLink">
          <div className="homePage">ProShop</div>
        </NavLink>
        <div className="navContainer">
          <nav>
            <NavLink to="/cart" className="navLink">
              <div>
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </div>
            </NavLink>
            {user.user && (
              <NavLink to="/profile" className="navLink">
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  {user.user.username}
                </div>
              </NavLink>
            )}
            {user.user ? (
              <div className="navLinkLogout" onClick={logoutHandler}>
                Logout
              </div>
            ) : (
              <NavLink to="/login" className="navLink">
                <div>
                  <FontAwesomeIcon icon={faUser} />
                  Login
                </div>
              </NavLink>
            )}
            {user.user && user.user.isAdmin && (
              <NavDropdown title="Admin" id="nav-dropdown">
                <LinkContainer to="/admin/usersList">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productsList">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/ordersList">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </nav>
          <div className="navLinkSearcBox">
            <SearcBox />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

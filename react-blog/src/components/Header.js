import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarText,
  Button,
  NavItem,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import bloglogo from "../images/blog_logo.PNG";
import { useHistory } from "react-router-dom";
import { FaList, FaTags, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  const logout = () => {
    if (localStorage.clear("token")) {
      history.push("/");
    } else {
      history.push("/");
    }
  };

  return (
    <Container fluid className="shadow ">
      <Navbar light expand="md">
        <NavbarBrand>
          <img className="blog-logo" alt="blog-logo" src={bloglogo} />
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto ">
            <NavItem>
              <NavLink>
                <Link className="navbar-menu" to="/">
                  <FaHome className="home-icon" />
                  HOME
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="navbar-menu" to="/tag">
                  <FaTags />
                  TAGS
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link className="navbar-menu" to="/category">
                  <FaList className="category-icon" />
                  CATEGORIES
                </Link>
              </NavLink>
            </NavItem>
          </Nav>

          <NavbarText>
            {token ? (
              <UncontrolledDropdown>
                <DropdownToggle nav caret className="login-user-name">
                  {user}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>
                    <Link to="/admin/tags">
                      <NavItem>Tags</NavItem>
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/admin/categories">
                      <NavItem>Categories</NavItem>
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/admin/posts">
                      <NavItem>Posts</NavItem>
                    </Link>
                  </DropdownItem>

                  <DropdownItem>
                    <Link onClick={logout}>Log out</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <Link to="/login">
                <Button className="create-button">Sign in</Button>
              </Link>
            )}
          </NavbarText>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;

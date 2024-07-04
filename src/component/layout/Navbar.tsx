import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Star } from "react-bootstrap-icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useFavoritesStore from "../../stores/FavoritesStore";

const Li = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const FavoritesWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    position: absolute;
    right: 15px;
    top: 15px;
  
  }
`;

function ForNavbar() {
  const favoritesCount = useFavoritesStore((state) => state.favoritesCount());

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container>
    
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto">
            <StyledNavLink to="/" className="nav-link text-white">
              HomePage
            </StyledNavLink>
            <StyledNavLink to="/users" className="nav-link text-white">
              Users Page
            </StyledNavLink>
          </Nav>
        </Navbar.Collapse>
        <FavoritesWrapper>
          <StyledNavLink to="/favorites" className="nav-link">
            <Li>
              <span style={{ fontSize: "0.9rem", marginRight: "5px", color: "white" }}>{favoritesCount}</span>
              <Star className='text-white' style={{ width: "1rem" }} />
            </Li>
          </StyledNavLink>
        </FavoritesWrapper>
      </Container>
    </Navbar>
  );
}

export default ForNavbar;

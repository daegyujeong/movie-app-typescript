import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.large};
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
`;

const NavLink = styled(Link) <{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  position: relative;
  padding: ${({ theme }) => theme.spacing.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
`;

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <NavLink to="/" $isActive={location.pathname === "/"}>
          Popular
          {location.pathname === "/" && (
            <UnderLine layoutId="underline" />
          )}
        </NavLink>
        <NavLink to="/coming-soon" $isActive={location.pathname === "/coming-soon"}>
          Coming Soon
          {location.pathname === "/coming-soon" && (
            <UnderLine layoutId="underline" />
          )}
        </NavLink>
        <NavLink to="/now-playing" $isActive={location.pathname === "/now-playing"}>
          Now Playing
          {location.pathname === "/now-playing" && (
            <UnderLine layoutId="underline" />
          )}
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
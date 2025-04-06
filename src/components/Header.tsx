import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  height: 60px;
`;

const Logo = styled(motion.div)`
  position: absolute;
  left: ${({ theme }) => theme.spacing.large};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xlarge};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.medium};
  }
`;

const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

interface NavLinkProps {
  isActive: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.text};
  font-weight: 600;
  transition: color 0.3s ease;
  padding: ${({ theme }) => theme.spacing.small};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Indicator = styled(motion.div)`
  position: absolute;
  height: 3px;
  bottom: -10px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

// Animation variants
const navVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.4
    }
  }
};

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <Nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <Logo
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        MOVIEFLEX
      </Logo>
      
      <NavList>
        <NavItem>
          <NavLink to="/" isActive={location.pathname === "/"}>
            POPULAR
            {location.pathname === "/" && (
              <Indicator layoutId="indicator" />
            )}
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/coming-soon" isActive={location.pathname === "/coming-soon"}>
            COMING SOON
            {location.pathname === "/coming-soon" && (
              <Indicator layoutId="indicator" />
            )}
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink to="/now-playing" isActive={location.pathname === "/now-playing"}>
            NOW PLAYING
            {location.pathname === "/now-playing" && (
              <Indicator layoutId="indicator" />
            )}
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default Header;
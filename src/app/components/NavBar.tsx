"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaUtensils, FaReceipt, FaClock, FaBoxOpen, FaStar, FaStore, FaClipboardList } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

// Styled Components
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, var(--diner-black) 0%, #2a2a2a 100%);
  border-bottom: 4px solid var(--chrome-silver);
  box-shadow: 
    0 4px 6px rgba(0,0,0,0.3),
    inset 0 -2px 0 var(--chrome-shine);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: var(--z-navbar);
  font-family: var(--font-display); 
  
  /* Checkered stripe at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-image: 
      linear-gradient(45deg, var(--diner-white) 25%, transparent 25%), 
      linear-gradient(-45deg, var(--diner-white) 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, var(--diner-white) 75%), 
      linear-gradient(-45deg, transparent 75%, var(--diner-white) 75%);
    background-size: 16px 16px;
    background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
    background-color: var(--diner-black);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.8rem;
  color: var(--cherry-red);
  cursor: pointer;
  font-family: var(--font-retro);
  text-shadow: 
    0 0 10px var(--cherry-red),
    0 0 20px var(--cherry-red);
  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 
      0 0 10px var(--neon-pink),
      0 0 20px var(--neon-pink),
      0 0 30px var(--neon-pink);
  }
  
  svg {
    font-size: 2rem;
    color: var(--mint-green);
    filter: drop-shadow(0 0 5px var(--mint-green));
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--cream);
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: var(--neon-pink);
    text-shadow: 0 0 10px var(--neon-pink);
    background: rgba(255, 105, 180, 0.1);
  }
  
  svg {
    font-size: 1rem;
    color: var(--mint-green);
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--cream);
  cursor: pointer;
  
  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 80px;
  right: 0;
  width: 100%;
  max-width: 300px;
  height: calc(100vh - 80px);
  background: var(--diner-black);
  border-left: 4px solid var(--chrome-silver);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;
`;

const MobileLink = styled(NavButton)`
  width: 100%;
  font-size: 1.2rem;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(192, 192, 192, 0.2);
  padding: 1rem;
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const links = [
    { id: "landing-page", label: "Welcome", icon: <FaStore /> },
    { id: "course-description", label: "Menu", icon: <FaClipboardList /> },
    { id: "lectures", label: "Specials", icon: <FaUtensils /> },
    { id: "assignments", label: "Orders", icon: <FaReceipt /> },
    { id: "calendar", label: "Hours", icon: <FaClock /> },
    { id: "resources", label: "Extras", icon: <FaBoxOpen /> },
    // { id: "final-project", label: "Chef's Pick", icon: <FaStar /> },
    { id: "staff", label: "Crew", icon: <GiCook /> },
  ];

  return (
    <NavContainer>
      <Logo onClick={() => scrollTo("landing-page")}>
        <GiCook />
        <span>CSCI 1470</span>
      </Logo>

      <NavLinks>
        {links.map(link => (
          <NavItem key={link.id}>
            <NavButton onClick={() => scrollTo(link.id)}>
              {link.icon}
              {link.label}
            </NavButton>
          </NavItem>
        ))}
      </NavLinks>

      <MobileToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileToggle>

      <MobileMenu $isOpen={isOpen}>
        {links.map(link => (
          <MobileLink key={link.id} onClick={() => scrollTo(link.id)}>
            {link.icon}
            {link.label}
          </MobileLink>
        ))}
      </MobileMenu>
    </NavContainer>
  );
};

export default NavBar;

  import React from 'react';
  import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
  } from './NavbarElements';
    
  const Navbar = () => {
    return (
      <>
        <Nav>
          <Bars />
    
          <NavBtn>
            <NavBtnLink to='/DataEntry'>DataEntry</NavBtnLink>
          </NavBtn>
         
          <NavBtn>
            <NavBtnLink to='/DatatablePage'>Filtered Reports</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to='/report'> Detail Reports</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to='/'>Settings</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to='/'>LogOut</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
    
  export default Navbar;
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

export default function Navigation(){

    return (
                <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                    <Navbar.Brand as={NavLink} to="/">DASHBOARD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} to="/new">Crear Viaje</Nav.Link>
                        </Nav>                      
                        <Nav>
                            <Nav.Link as={NavLink} to="/account">Mi cuenta</Nav.Link>
                            <Nav.Link as={NavLink} to="/login">Iniciar Sesión</Nav.Link> 
                            <Nav.Link as={NavLink} to="/register">Registrarse</Nav.Link>    
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>  
    )
}

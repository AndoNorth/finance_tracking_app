import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/Finances">
                            Finances
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/BarChart">
                            Bar Chart
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
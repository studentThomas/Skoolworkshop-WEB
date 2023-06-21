"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../css/Color.css"

export default function Nav() {
  return (
<Navbar bg="white" expand="lg" className="navbar-divider sticky-top">
      <div className="container">
        <Navbar.Brand href="/workshops">
          <img src='https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2020/06/Skool-Workshop_Logo.png' alt="Skool Workshop Logo" className="logo-img" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a href="/dashboard" className="nav-link text-black">
                Notificaties
              </a>
            </li>
            <li className="nav-item">
              <a href="/workshops" className="nav-link text-black">
                Workshops
              </a>
            </li>
            <li className="nav-item">
              <a href="/orders" className="nav-link text-black">
                Bestellingen
              </a>
            </li>
            <li className="nav-item">
              <a href="/scanner" className="nav-link text-black">
                Scanner
              </a>
            </li>
          </ul>

          <NavDropdown
            title="Profiel"
            id="basic-nav-dropdown"
            className="btn btn-color"
          >
            <NavDropdown.Item href="/addProduct">
              Nieuw product
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/persons">Gebruikers</NavDropdown.Item>
            <NavDropdown.Item href="/profile">Profiel</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">Uitloggen</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';




export default function Nav() {
  return (
<header className="pt-3 pb-2 text-bg-dark border-bottom">
  <div className="container">
    <div className="d-flex flex-wrap flex-nowrap">

      <ul className="nav col-12 col-md-auto my-2 me-lg-auto justify-center md:justify-start my-md-0 text-small ps-0 space-x-4">
        <li className="col-3">
          <a href="/" className="nav-link text-white">
            Dashboard
          </a>
        </li>
        <li className="col-3">
          <a href="/workshops" className="nav-link text-white">
            Workshops
          </a>
        </li>
        <li className="col-3">
          <a href="/orders" className="nav-link text-white">
            Bestellingen
          </a>
        </li>
        <li className="col-3">
          <a href="/scanner" className="nav-link text-white">
            Scanner
          </a>
        </li>
      </ul>



        <div className="dropdown text-end d-none d-lg-block">
          {/* Display only on large screens */}
          <Dropdown>
            <Dropdown.Toggle
              as="a"
              href="#"
              className="btn btn-warning dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdown-basic"
            >
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu text-small">
              <Dropdown.Item href="/addProduct">Nieuw product</Dropdown.Item>
              <Dropdown.Item href="#">Nieuw workshop</Dropdown.Item>
              <Dropdown.Divider /> {/* Divider */}
              <Dropdown.Item href="/persons">Personen</Dropdown.Item>
              <Dropdown.Item href="#">Profiel</Dropdown.Item>
              <Dropdown.Divider /> {/* Divider */}
              <Dropdown.Item href="/login">Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>


      </div>
    </div>
  </header>

 
  );
}

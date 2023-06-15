"use client";

import "../../css/Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

async function login() {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAdress: "thomas@gmail.com",
        password: "secret123"
      }),
    });

    const data = await response.json();
    const role = data?.data?.role;

    localStorage.setItem('role', role);


    // router.push("/scanner");

  }

  

  


export default function LoginPage() {


    return (
        <div className="d-flex align-items-center justify-content-center py-4 ">
        <form>
        {/* <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        <h1 className="h3 mb-3 fw-bold">Login</h1>
    
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"></input>
          <label >Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
          <label >Password</label>
        </div>
    
        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
          <label className="form-check-label" >
            Remember me
          </label>
        </div>
      <button className="btn btn-warning w-100 py-2" onClick={() => login()}>Sign in</button>

        <p className="mt-5 mb-3 text-body-secondary">&copy; Skoolworkshop 2023 </p>
      </form>
        </div>

    
    );
}



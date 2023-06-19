"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

async function login(email: any, password: any) {
  try {
    const response = await fetch(`https://skoolworkshop.up.railway.app/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAdress: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok && response.status === 200) {
      // Login successful
      const { Role, EmailAdress } = data.data; // Assuming the role information is provided in the response as "Role"
      localStorage.setItem('role', Role); // Store the role in localStorage
      localStorage.setItem('email', EmailAdress); // Store the email in localStorage
      console.log('Login successful');
    } else {
      // Login failed
      console.error('Login failed');
    }

    return response;
  } catch (error) {
    console.error('An error occurred during login');
    throw error;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await login(email, password);
      if (response?.status === 200) {
        router.push('/workshops');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <form>
        <h1 className="h3 mb-3 fw-bold">Login</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>E-mailadres</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Wachtwoord</label>
        </div>

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
          <label className="form-check-label">Remember me</label>
        </div>
        <button className="btn btn-warning w-100 py-2" type="button" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}

        <p className="mt-5 mb-3 text-body-secondary">&copy; Skoolworkshop 2023</p>
      </form>
    </div>
  );
}

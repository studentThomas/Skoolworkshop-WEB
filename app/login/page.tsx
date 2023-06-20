"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/Color.css"
import "../../css/Login.css"
import { Alert } from 'react-bootstrap';

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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe');
    const storedEmail = localStorage.getItem('email');
  
    if (storedRememberMe === 'true') {
      setRememberMe(true);
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
    }
  }, []);
  

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await login(email, password);
      if (response?.status === 200) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('email');
        }

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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-12 text-center">
          <div className="logo">
            <img src="https://cdn-bnege.nitrocdn.com/MVgfApSlnIZMEMtTrPfeVWWDRvGvEHus/assets/images/optimized/rev-aeea760/wp-content/uploads/2020/06/Skool-Workshop_Logo.png" alt="Logo" />
          </div>
        </div>
        <div className="col-12">
          <div className="login-card bg-white rounded shadow p-4">
            <h2 className="mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label font-weight-bold">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label font-weight-bold">
                  Wactwoord:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Onthouden
                </label>
              </div>
              <div className="text-center">
                <button className="btn w-100 btn-color" type="button" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
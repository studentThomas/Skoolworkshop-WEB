"use client";
import Nav from '@/components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState, useEffect } from 'react';

interface UserProfile {
  Id: number;
  EmailAdress: string;
  Password: string;
  FirstName: string;
  PhoneNumber: string;
  Role: string;
}

async function getUserProfile(email: string): Promise<UserProfile | undefined> {
  const response = await fetch('https://skoolworkshop.up.railway.app/api/user');
  const data = await response.json();
  const userProfile = data?.data.find((user: UserProfile) => user.EmailAdress === email);
  return userProfile;
}

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('email'); // Retrieve the logged-in user's email from localStorage
    if (userEmail) {
      getUserProfile(userEmail).then((data) => {
        setUserProfile(data || null);
      }).catch((error) => {
        console.error('An error occurred while fetching user profile');
        setUserProfile(null);
      });
    }
  }, []);

  return (
    <div>
      <Nav />
      <h2 className="text-center p-2">Jouw profiel</h2>
      {userProfile ? (
        <div className="container">
          <p>
            <strong>E-mailadres:</strong> {userProfile.EmailAdress}
          </p>
          <p>
            <strong>Naam:</strong> {userProfile.FirstName}
          </p>
          <p>
            <strong>Telefoonnummer:</strong> {userProfile.PhoneNumber}
          </p>
          <p>
            <strong>Rol:</strong> {userProfile.Role}
          </p>
        </div>
      ) : (
        <p>Profiel laden...</p>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

async function getNotifications() {
  try {
    const response = await fetch('https://skoolworkshop.up.railway.app/api/notification');
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    const data = await response.json();
    return data.data; // Access the "data" property to retrieve the notifications array
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
    }

    fetchData();
  }, []);

  return (
    <div className="container text-center my-5">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>There are no notifications.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} className="notification-container">
            <h2 className="notification-title">{notification.Title}</h2>
            <p className="notification-message">{notification.Message}</p>
            <p className="notification-date">{new Date(notification.PostDateTime).toLocaleDateString()}</p>
          </div>
        ))
      )}
      <style>
        {`
        .notification-container {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
        }
        .notification-title {
          font-size: 24px;
          text-align: left;
        }
        .notification-message {
          text-align: left;
        }
        .notification-date {
          text-align: left;
        }
        `}
      </style>
    </div>
  );
  
}

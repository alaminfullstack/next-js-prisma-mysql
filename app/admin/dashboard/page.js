'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        router.push('/login');
        return;
      }

      const userInfo = JSON.parse(localStorage.getItem('user'));
      setUser(userInfo);
    };

    checkAuth();
  }, [router]);


  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    // Clear the token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Add more user details as needed */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

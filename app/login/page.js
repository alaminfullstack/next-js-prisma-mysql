'use client';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

//   useEffect(() => {
//     // Check if the user is already authenticated
//     const token = localStorage.getItem('token');

//     if (token) {
//       // Redirect to dashboard if the user is already logged in
//       router.push('/dashboard');
//     }
//   }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

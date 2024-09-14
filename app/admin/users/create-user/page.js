'use client'; // This is a client component because it handles form submission on the client

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import bcrypt from 'bcryptjs';

export default function NewUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, password: hashedPassword }),
    });

    if (res.ok) {
      router.push('/users'); // Redirect to homepage or success page after successful form submission
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className='container mx-auto px-3'>
      <h1>Create New User</h1>
      <Link href={'/admin/users'}>User List</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className='text-blue-500 w-100 mb-2 block'>Name:</label>
          <input
            type="text"
            className='border-2 border-blue-300 w-full rounded-sm px-3 py-2 bg-transparent mb-3'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

        <label className='text-blue-500 w-100 mb-2 block'>Phone:</label>
          <input
            type="number"
            className='border-2 border-blue-300 w-full rounded-sm px-3 py-2 bg-transparent mb-3'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

        <label className='text-blue-500 w-100 mb-2 block'>Email:</label>
          <input
            type="email"
            className='border-2 border-blue-300 w-full rounded-sm px-3 py-2 bg-transparent mb-3'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        <label className='text-blue-500 w-100 mb-2 block'>Password:</label>
          <input
            type="password"
            className='border-2 border-blue-300 w-full rounded-sm px-3 py-2 bg-transparent mb-3'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button type="submit" className='w-50 ring ring-green-500 px-3 py-2 rounded mt-2'>Submit</button>
      </form>
    </div>
  );
}

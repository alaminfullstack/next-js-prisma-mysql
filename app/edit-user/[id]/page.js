'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Fetch user data to populate form
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${params.id}`);
      const data = await res.json();
      setName(data.name);
      setEmail(data.email);
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      router.push('/'); // Redirect after updating
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

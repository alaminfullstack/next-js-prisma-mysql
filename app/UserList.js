'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserList({ users }) {
  const [userList, setUserList] = useState(users);
  const router = useRouter();

  // Function to handle deletion of a user
  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Remove deleted user from the list
      setUserList(userList.filter(user => user.id !== id));
    } else {
      alert('Failed to delete user.');
    }
  };

  return (
    <ul>
      {userList.length > 0 ? (
        userList.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <button onClick={() => router.push(`/edit-user/${user.id}`)}>Edit</button>
          </li>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </ul>
  );
}

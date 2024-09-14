import { PrismaClient } from '@prisma/client';
import UserList from './components/UserList'; // Import the Client Component
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch users from Prisma on the server side
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <Link href={'/users/create-user'}>Create New User</Link>
      {/* Pass users data to the Client Component */}
      <UserList users={users} />
    </div>
  );
}

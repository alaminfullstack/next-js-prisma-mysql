import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import UserList from './../../components/UserList';

const prisma = new PrismaClient();

export default async function User() {
  // Fetch users from Prisma on the server side
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      <Link href={'/admin/users/create-user'}>Create New User</Link>
      {/* Pass users data to the Client Component */}
      <UserList users={users} />
    </div>
  );
}

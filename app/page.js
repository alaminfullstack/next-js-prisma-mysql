import { PrismaClient } from '@prisma/client';
import UserList from './UserList'; // Import the Client Component

const prisma = new PrismaClient();

export default async function Home() {
  // Fetch users from Prisma on the server side
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users</h1>
      {/* Pass users data to the Client Component */}
      <UserList users={users} />
    </div>
  );
}

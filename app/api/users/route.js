import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req) {
  const body = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

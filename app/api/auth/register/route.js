import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, email, phone, password } = await req.json();

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Registration failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

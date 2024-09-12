import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET; // Replace with an environment variable

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

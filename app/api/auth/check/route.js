import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Replace with an environment variable

export async function GET(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ success: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

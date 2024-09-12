import { NextResponse } from 'next/server';

export function middleware(req) {
  const token =  localStorage.getItem('token'); // Assuming token is stored in cookies

  if (req.nextUrl.pathname === '/login' && token) {
    // Redirect authenticated users away from the login page
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

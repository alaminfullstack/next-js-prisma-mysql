import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token =  localStorage.getItem('token'); // Check for token in cookies
  
  if (pathname === '/login' && token) {
    // Redirect authenticated users away from the login page
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Check if the path starts with '/admin'
  if (pathname.startsWith('/admin')) {
    

    if (!token) {
      // Redirect to login page if no token
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Allow request to continue for other paths
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'], // Apply middleware to admin pages and API routes
};

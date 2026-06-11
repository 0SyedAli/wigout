import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Define public routes
    const isPublicRoute = 
        pathname === '/auth/login' || 
        pathname === '/auth/signup' ||
        pathname === '/login' ||
        pathname === '/signup';

    // Define protected routes (starting with /dashboard)
    const isProtectedRoute = pathname.startsWith('/dashboard');

    const token = request.cookies.get('auth_token')?.value;

    // If route is protected and no token, redirect to /auth/login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If route is public and token exists, redirect to /dashboard
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect short-hand /login and /signup to actual next.js routes
    if (pathname === '/login') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    if (pathname === '/signup') {
        return NextResponse.redirect(new URL('/auth/signup', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

import { clerkMiddleware, createRouteMatcher,} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Define protected and public routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware( async (auth, req:NextRequest) => {
  const { userId } = await auth();

  // Redirect unauthenticated users trying to access protected routes to sign-in
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  
  // Redirect authenticated users away from public auth routes to dashboard
  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    "/sso-callback",
  ],
};

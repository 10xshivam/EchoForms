import { clerkMiddleware, createRouteMatcher,} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicRoute = createRouteMatcher(['/login(.*)', '/sign-up(.*)','/form/submit(.*)]']);

export default clerkMiddleware( async (auth, req:NextRequest) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (userId && isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    "/sso-callback",
  ],
};

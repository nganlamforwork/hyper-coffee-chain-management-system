import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	const token = req.cookies.get('access_token')?.value;
	const { pathname } = req.nextUrl;

	if (pathname.startsWith('/dashboard') && !token) {
		return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
	}

	// Continue with the original request if the user is logged in
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/'],
};

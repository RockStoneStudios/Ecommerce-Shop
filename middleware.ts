// // import { NextResponse, type NextRequest } from 'next/server'
 
// // import * as jose from 'jose';
 
// // export async function middleware(req: NextRequest) {
// //   const previousPage = req.nextUrl.pathname;
 
// //   if (previousPage.startsWith('/checkout')) {
// //     const token = req.cookies.get('token')?.value || '';
 
// //     try {
// //       await jose.jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
// //       return NextResponse.next();
// //     } catch (error) {
// //       return NextResponse.redirect(
// //         new URL(`/auth/login?p=${previousPage}`, req.url)
// //       );
// //     }
// //   }
// // };
 
// // export const config = {
// //   matcher: [
// //     '/checkout/summary',
// //     '/checkout/address'
// //   ],
// // };



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
 
// import { getToken } from "next-auth/jwt";
 
// export async function middleware(request: NextRequest) {
//   const requestedPage = request.nextUrl.pathname;
 
//   if (request.nextUrl.pathname.startsWith("/checkout/address")) {
//     //* Informacion util de la session de next auth
//     const session = await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//       raw: true,
//     });
 
//     if (!session) {
//       if (request.nextUrl.pathname.startsWith('/api/admin')) {
//         return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
//       }
//       return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, request.url));
//     }
 
//     return NextResponse.next();
//   }
// }
 
// export const config = {
//   matcher: "/checkout/:path*",
// };



import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export async function middleware(req: NextRequest) {
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
 
 
  if (!session) {
 
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
 
    const requestedPage = req.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));;
  }
 
  const validRoles = ['admin'];
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
 
  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
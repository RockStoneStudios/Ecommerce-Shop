// import { NextResponse, type NextRequest } from 'next/server'
 
// import * as jose from 'jose';
 
// export async function middleware(req: NextRequest) {
//   const previousPage = req.nextUrl.pathname;
 
//   if (previousPage.startsWith('/checkout')) {
//     const token = req.cookies.get('token')?.value || '';
 
//     try {
//       await jose.jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       );
//     }
//   }
// };
 
// export const config = {
//   matcher: [
//     '/checkout/summary',
//     '/checkout/address'
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
import { getToken } from "next-auth/jwt";
 
export async function middleware(request: NextRequest) {
  const requestedPage = request.nextUrl.pathname;
 
  if (request.nextUrl.pathname.startsWith("/checkout/address")) {
    //* Informacion util de la session de next auth
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true,
    });
 
    if (!session) {
      return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, request.url));
    }
 
    return NextResponse.next();
  }
}
 
export const config = {
  matcher: "/checkout/:path*",
};
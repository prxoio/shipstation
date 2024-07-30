import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export async function middleware(req: NextRequest) {
  const auth = getAuth();
  const url = req.nextUrl.clone();

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user && !url.pathname.startsWith('/auth')) {
        url.pathname = '/auth/login';
        resolve(NextResponse.redirect(url));
      } else {
        resolve(NextResponse.next());
      }
    });
  });
}
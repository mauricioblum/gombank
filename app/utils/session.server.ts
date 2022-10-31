import type { Session } from '@remix-run/node';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

type LoginForm = {
  accountNumber: string;
  password: string;
};

export async function login({ accountNumber, password }: LoginForm) {
  const request = await fetch(`${process.env.APP_URL}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ accountNumber, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await request.json();
  if (!response) {
    throw Error('Unknown error');
  }
  return response;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'GomBank_session_new',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: ['gombank123123123'],
    sameSite: 'lax',
    path: '/',
    maxAge: 12600,
    httpOnly: true,
    expires: new Date(Date.now() + 12600000),
  },
});

export function getUserSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get('cookie'));
}

export async function createUserSession(userId: string, redirectTo: string) {
  console.log('🚀 ~ createUserSession ~ redirectTo', redirectTo);
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      }),
    },
  });
}

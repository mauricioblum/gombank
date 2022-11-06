import type { Session } from '@remix-run/node';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

type LoginForm = {
  accountNumber: string;
  password: string;
};

export type ToastMessage = { message: string; type: 'success' | 'error' };

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

const storage = createCookieSessionStorage({
  cookie: {
    name: 'GomBank_session_new',
    secure: process.env.NODE_ENV === 'production',
    secrets: ['gombank123123123'],
    sameSite: 'lax',
    path: '/',
    maxAge: 12600,
    httpOnly: true,
  },
});

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export function getUserSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get('cookie'));
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  session.set('token', 'FAKE_USER_TOKEN');
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session, {
        expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      }),
    },
  });
}

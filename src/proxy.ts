import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import debug from 'debug';
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import urlJoin from 'url-join';

import { authEnv } from '@/config/auth';
import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import { LOBE_THEME_APPEARANCE } from '@/const/theme';
import { isDesktop } from '@/const/version';
import { appEnv } from '@/envs/app';
import NextAuthEdge from '@/libs/next-auth/edge';
import { Locales } from '@/locales/resources';
import { parseBrowserLanguage } from '@/utils/locale';
import { parseDefaultThemeFromCountry } from '@/utils/server/geo';
import { RouteVariants } from '@/utils/server/routeVariants';

import { OAUTH_AUTHORIZED } from './const/auth';
import { oidcEnv } from './envs/oidc';

const logDefault = debug('proxy:default');
const logNextAuth = debug('proxy:next-auth');
const logClerk = debug('proxy:clerk');

const OIDC_SESSION_HEADER = 'x-oidc-session-sync';

export const config = {
  matcher: [
    '/(api|trpc|webapi)(.*)',
    '/',
    '/discover',
    '/discover(.*)',
    '/chat',
    '/chat(.*)',
    '/changelog(.*)',
    '/settings(.*)',
    '/image',
    '/files',
    '/files(.*)',
    '/repos(.*)',
    '/profile(.*)',
    '/me',
    '/me(.*)',
    '/login(.*)',
    '/signup(.*)',
    '/next-auth/(.*)',
    '/oauth(.*)',
    '/oidc(.*)',
  ],
};

const backendApiEndpoints = ['/api', '/trpc', '/webapi', '/oidc'];

const defaultMiddleware = (request: NextRequest) => {
  const url = new URL(request.url);
  logDefault('Processing request: %s %s', request.method, request.url);

  if (process.env.NODE_ENV === 'production') {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const currentHost = url.hostname;

    const primaryDomain = 'chatai.markqq.com';
    const secondaryDomain = 'aichat.markqq.com';

    logDefault('Domain redirect check: day=%d, host=%s', dayOfMonth, currentHost);

    if (dayOfMonth <= 10) {
      if (currentHost === secondaryDomain) {
        const redirectUrl = new URL(request.url);
        redirectUrl.hostname = primaryDomain;
        logDefault('Redirecting to primary domain: %s', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl, { status: 301 });
      }
    } else {
      if (currentHost === primaryDomain) {
        const redirectUrl = new URL(request.url);
        redirectUrl.hostname = secondaryDomain;
        logDefault('Redirecting to secondary domain: %s', redirectUrl.toString());
        return NextResponse.redirect(redirectUrl, { status: 301 });
      }
    }
  }

  if (backendApiEndpoints.some((path) => url.pathname.startsWith(path))) {
    logDefault('Skipping API request: %s', url.pathname);
    return NextResponse.next();
  }

  const theme =
    request.cookies.get(LOBE_THEME_APPEARANCE)?.value || parseDefaultThemeFromCountry(request);

  const explicitlyLocale = (url.searchParams.get('hl') || undefined) as Locales | undefined;

  const browserLanguage = parseBrowserLanguage(request.headers);

  const locale =
    explicitlyLocale ||
    ((request.cookies.get(LOBE_LOCALE_COOKIE)?.value || browserLanguage) as Locales);

  const ua = request.headers.get('user-agent');

  const device = new UAParser(ua || '').getDevice();

  logDefault('User preferences: %O', {
    browserLanguage,
    deviceType: device.type,
    hasCookies: {
      locale: !!request.cookies.get(LOBE_LOCALE_COOKIE)?.value,
      theme: !!request.cookies.get(LOBE_THEME_APPEARANCE)?.value,
    },
    locale,
    theme,
  });

  const route = RouteVariants.serializeVariants({
    isMobile: device.type === 'mobile',
    locale,
    theme,
  });

  logDefault('Serialized route variant: %s', route);

  if (appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL) {
    logDefault('Local container rewrite enabled: %O', {
      host: '127.0.0.1',
      original: url.toString(),
      port: process.env.PORT || '3210',
      protocol: 'http',
    });

    url.protocol = 'http';
    url.host = '127.0.0.1';
    url.port = process.env.PORT || '3210';
  }

  const nextPathname = `/${route}` + (url.pathname === '/' ? '' : url.pathname);
  const nextURL = appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL
    ? urlJoin(url.origin, nextPathname)
    : nextPathname;

  logDefault('URL rewrite: %O', {
    isLocalRewrite: appEnv.MIDDLEWARE_REWRITE_THROUGH_LOCAL,
    nextPathname: nextPathname,
    nextURL: nextURL,
    originalPathname: url.pathname,
  });

  url.pathname = nextPathname;

  return NextResponse.rewrite(url, { status: 200 });
};

const isPublicRoute = createRouteMatcher([
  '/api/auth(.*)',
  '/api/webhooks(.*)',
  '/webapi(.*)',
  '/trpc(.*)',
  '/next-auth/(.*)',
  '/login',
  '/signup',
  '/oidc/handoff',
  '/oidc/token',
]);

const isProtectedRoute = createRouteMatcher([
  '/settings(.*)',
  '/files(.*)',
  '/onboard(.*)',
  '/oauth(.*)',
]);

const nextAuthMiddleware = NextAuthEdge.auth(async (req) => {
  logNextAuth('NextAuth middleware processing request: %s %s', req.method, req.url);

  const response = defaultMiddleware(req);

  const isProtected =
    (appEnv.ENABLE_AUTH_PROTECTION ? !isPublicRoute(req) : isProtectedRoute(req)) && !isDesktop;

  logNextAuth('Route protection status: %s, %s', req.url, isProtected ? 'protected' : 'public');

  const session = req.auth;

  const isLoggedIn = !!session?.expires;

  logNextAuth('NextAuth session status: %O', {
    expires: session?.expires,
    isLoggedIn,
    userId: session?.user?.id,
  });

  response.headers.delete(OAUTH_AUTHORIZED);
  if (isLoggedIn) {
    logNextAuth('Setting auth header: %s = %s', OAUTH_AUTHORIZED, 'true');
    response.headers.set(OAUTH_AUTHORIZED, 'true');

    if (oidcEnv.ENABLE_OIDC && session?.user?.id) {
      logNextAuth('OIDC session pre-sync: Setting %s = %s', OIDC_SESSION_HEADER, session.user.id);
      response.headers.set(OIDC_SESSION_HEADER, session.user.id);
    }
  } else {
    if (isProtected) {
      logNextAuth('Request a protected route, redirecting to sign-in page');
      const nextLoginUrl = new URL('/next-auth/signin', req.nextUrl.origin);
      nextLoginUrl.searchParams.set('callbackUrl', req.nextUrl.href);
      return Response.redirect(nextLoginUrl);
    }
    logNextAuth('Request a free route but not login, allow visit without auth header');
  }

  return response;
});

const clerkAuthMiddleware = clerkMiddleware(
  async (auth, req) => {
    logClerk('Clerk middleware processing request: %s %s', req.method, req.url);

    const isProtected =
      (appEnv.ENABLE_AUTH_PROTECTION ? !isPublicRoute(req) : isProtectedRoute(req)) && !isDesktop;

    logClerk('Route protection status: %s, %s', req.url, isProtected ? 'protected' : 'public');

    if (isProtected) {
      logClerk('Protecting route: %s', req.url);
      await auth.protect();
    }

    const response = defaultMiddleware(req);

    const data = await auth();
    logClerk('Clerk auth status: %O', {
      isSignedIn: !!data.userId,
      userId: data.userId,
    });

    if (oidcEnv.ENABLE_OIDC && data.userId) {
      logClerk('OIDC session pre-sync: Setting %s = %s', OIDC_SESSION_HEADER, data.userId);
      response.headers.set(OIDC_SESSION_HEADER, data.userId);
    } else if (oidcEnv.ENABLE_OIDC) {
      logClerk('No Clerk user detected, not setting OIDC session sync header');
    }

    return response;
  },
  {
    clockSkewInMs: 60 * 60 * 1000,
    signInUrl: '/login',
    signUpUrl: '/signup',
  },
);

logDefault('Proxy configuration: %O', {
  enableAuthProtection: appEnv.ENABLE_AUTH_PROTECTION,
  enableClerk: authEnv.NEXT_PUBLIC_ENABLE_CLERK_AUTH,
  enableNextAuth: authEnv.NEXT_PUBLIC_ENABLE_NEXT_AUTH,
  enableOIDC: oidcEnv.ENABLE_OIDC,
});

const proxy = authEnv.NEXT_PUBLIC_ENABLE_CLERK_AUTH
  ? clerkAuthMiddleware
  : authEnv.NEXT_PUBLIC_ENABLE_NEXT_AUTH
    ? nextAuthMiddleware
    : defaultMiddleware;

export default proxy;

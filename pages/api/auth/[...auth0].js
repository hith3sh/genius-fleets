import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      scope: 'openid profile email',
      audience: process.env.AUTH0_AUDIENCE,
    },
  }),
  logout: handleLogout({
    returnTo: process.env.AUTH0_BASE_URL,
  }),
  callback: handleCallback({
    afterCallback: (req, res, session) => {
      console.log('✅ Auth0: User authenticated successfully');
      return session;
    },
  }),
});
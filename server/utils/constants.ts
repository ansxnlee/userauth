export const __prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.port || 4000;
export const CORSORIGIN = 'http://localhost:3000';
export const COOKIE_NAME = 'userauth_cookie';
export const COOKIE_SECRET = 'superdupersecretpass';
export const COOKIE_MAX_AGE = 3600000;
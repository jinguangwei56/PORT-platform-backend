// FONKON v1.1 authentication/authorization foundation.
// Production deployment should replace the demo token issuer with a managed identity provider or secure JWT implementation.
const users = new Map();

export const ROLES = Object.freeze({ ADMIN:'ADMIN', MANAGER:'MANAGER', SALES:'SALES' });

export function createUser({userId, name, role=ROLES.SALES}) {
  if (!userId || !name || !Object.values(ROLES).includes(role)) throw new Error('invalid_user');
  const user={userId,name,role,active:true,createdAt:new Date().toISOString()};
  users.set(userId,user); return user;
}

export function getUser(userId) { return users.get(userId) ?? null; }

export function authorize(user, allowedRoles) {
  if (!user || !user.active) throw new Error('unauthorized');
  if (!allowedRoles.includes(user.role)) throw new Error('forbidden');
  return true;
}

export function demoToken(userId) { return `fonkon-demo:${userId}`; }
export function userFromToken(token) {
  if (!token?.startsWith('fonkon-demo:')) return null;
  return getUser(token.slice('fonkon-demo:'.length));
}

// Registration and login are handled by native pages served directly by the
// ERPNext/Frappe backend (same-origin with its own API — no CORS/CSRF surface
// for these two flows), not by this SPA. See tijarat_app/www/register.html
// and login.html.
const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'https://portal.tijaratapp.com';

export function getPortalRegisterUrl(role) {
  return role ? `${PORTAL_URL}/register?role=${encodeURIComponent(role)}` : `${PORTAL_URL}/register`;
}

export function getPortalLoginUrl() {
  return `${PORTAL_URL}/login`;
}

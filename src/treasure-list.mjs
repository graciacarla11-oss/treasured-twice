import { treasureListConfig } from './treasure-list-config.mjs';

// Accept only Mailchimp's public hosted-form URLs, never API/POST endpoints.
export function validateSignupUrl(value) {
  if (typeof value !== 'string' || !value || /\s/.test(value)) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash) return null;

  if (url.hostname === 'eepurl.com') {
    return /^\/[A-Za-z0-9_-]+$/.test(url.pathname) && !url.search ? url.href : null;
  }

  if (!/^[a-z0-9-]+\.(?:us\d+\.)?list-manage\.com$/.test(url.hostname)) return null;
  if (url.pathname !== '/subscribe') return null;
  const keys = [...url.searchParams.keys()];
  if (keys.length !== 2 || !keys.includes('u') || !keys.includes('id')) return null;
  if (!['u', 'id'].every(key => /^[a-f0-9]+$/i.test(url.searchParams.get(key)))) return null;
  return url.href;
}

export function activateTreasureList(root, config) {
  const pending = root.getElementById('treasure-list-pending');
  const link = root.getElementById('treasure-list-link');
  const status = root.getElementById('treasure-list-status');
  if (!pending || !link || !status) return false;

  // Reset first so missing or invalid configuration always leaves an honest state.
  pending.hidden = false;
  link.hidden = true;
  link.removeAttribute('href');
  status.textContent = 'Email signups are being prepared. Please check back.';

  const url = validateSignupUrl(config?.hostedSignupUrl);
  if (config?.signupVerified !== true || !url) return false;

  link.href = url;
  status.textContent = 'Continue to our signup form on Mailchimp. Confirm by email to join; unsubscribe anytime.';
  pending.hidden = true;
  link.hidden = false;
  return true;
}

if (typeof document !== 'undefined') {
  activateTreasureList(document, treasureListConfig);
}

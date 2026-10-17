import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSignupUrl, activateTreasureList } from '../src/treasure-list.mjs';

// Synthetic URL fixtures; never visit or submit these during testing.
const hostedUrl = 'https://fixture.us1.list-manage.com/subscribe?u=abcdef0123456789&id=123abc';

test('accepts HTTPS hosted forms and Mailchimp short links', () => {
  for (const url of [hostedUrl, 'https://fixture.list-manage.com/subscribe?id=123abc&u=abcdef', 'https://eepurl.com/test_123-abc']) {
    assert.equal(validateSignupUrl(url), url);
  }
});

test('rejects unsafe URLs, lookalike domains, endpoints and extra data', () => {
  const invalid = [
    '', undefined, null, {}, 'not a URL', '/subscribe', '//eepurl.com/fixture',
    'javascript:alert(1)', 'mailto:hello@example.com',
    hostedUrl.replace('https:', 'http:'),
    hostedUrl.replace('fixture.us1.', 'fixture.us1.list-manage.com.evil.'),
    'https://list-manage.com.evil.example/subscribe?u=abc&id=abc',
    'https://evillist-manage.com/subscribe?u=abc&id=abc',
    hostedUrl.replace('fixture.us1.list-manage.com', 'user:password@fixture.us1.list-manage.com'),
    hostedUrl.replace('.com/', '.com:8443/'),
    hostedUrl.replace('/subscribe?', '/subscribe/post?'),
    hostedUrl.replace('&id=123abc', ''),
    hostedUrl.replace('id=123abc', 'id='),
    hostedUrl.replace('u=abcdef0123456789', 'u=example'),
    hostedUrl + '&u=def', hostedUrl + '&email=someone@example.com',
    hostedUrl + '#fragment', hostedUrl + ' ',
    'https://eepurl.com/', 'https://eepurl.com/fixture?email=person@example.com',
    'https://eepurl.com.evil.example/fixture',
  ];
  for (const url of invalid) assert.equal(validateSignupUrl(url), null, String(url));
});

// Small DOM contract fixture: exercises state changes without browser/network access.
function fixture() {
  const nodes = new Map(['pending', 'link', 'status'].map(name => [
    `treasure-list-${name}`,
    { hidden: name === 'link', textContent: '', removeAttribute(name) { delete this[name]; } },
  ]));
  return { getElementById: id => nodes.get(id), nodes };
}

test('a valid URL alone never enables an unverified signup', () => {
  for (const verified of [undefined, false, 'true', 1]) {
    const root = fixture();
    assert.equal(activateTreasureList(root, { hostedSignupUrl: hostedUrl, signupVerified: verified }), false);
    assert.equal(root.getElementById('treasure-list-link').hidden, true);
    assert.equal(root.getElementById('treasure-list-link').href, undefined);
    assert.equal(root.getElementById('treasure-list-pending').hidden, false);
    assert.match(root.getElementById('treasure-list-status').textContent, /being prepared/);
  }
});

test('verified configuration exposes a link without claiming subscription success', () => {
  const root = fixture();
  assert.equal(activateTreasureList(root, { hostedSignupUrl: hostedUrl, signupVerified: true }), true);
  assert.equal(root.getElementById('treasure-list-link').href, hostedUrl);
  assert.equal(root.getElementById('treasure-list-link').hidden, false);
  assert.equal(root.getElementById('treasure-list-pending').hidden, true);
  assert.match(root.getElementById('treasure-list-status').textContent, /Confirm by email/);
});

test('invalid or removed configuration clears any previously enabled destination', () => {
  for (const config of [undefined, {}, { signupVerified: true, hostedSignupUrl: 'https://evil.example' }]) {
    const root = fixture();
    activateTreasureList(root, { hostedSignupUrl: hostedUrl, signupVerified: true });
    assert.equal(activateTreasureList(root, config), false);
    assert.equal(root.getElementById('treasure-list-link').href, undefined);
    assert.equal(root.getElementById('treasure-list-link').hidden, true);
    assert.equal(root.getElementById('treasure-list-pending').hidden, false);
  }
});

test('pages without the signup elements are left alone', () => {
  assert.equal(activateTreasureList({ getElementById: () => null }, {}), false);
});

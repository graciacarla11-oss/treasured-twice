# Treasure List: account setup and release checks

## Current status

The invitation appears only on the homepage. Its heading, copy, and action share a centered column, a thin iridescent border, and the existing teal background. Contact retains item requests and general questions.

**Automated subscriptions are not active.** No provider account, hosted form, sender identity, consent settings, delivery, or unsubscribe flow has been verified. The default configuration is an empty URL and `signupVerified: false`. Visitors see a disabled button and an availability message. No email address is collected or stored by this website.

## Recommended integration

Use a Mailchimp-hosted email signup form. This fits the static site: Mailchimp handles subscriber records and confirmation, and the site needs only a public HTTPS link. It avoids exposing API keys or maintaining a subscription server. No external scripts, iframe, tracking pixels, cookies, or subscriber storage are added by this integration. Visiting the form brings visitors to Mailchimp, where its own policies apply.

The recommendation does not create an account or select a paid plan. Confirm current account limits and cost before committing to a provider. A different provider requires a reviewed URL validator update.

## Account owner setup

1. Use an owner-controlled Mailchimp account and create or select the Treasure List audience. Enable account multifactor authentication.
2. Verify the sender mailbox you control. Authenticate `shoptreasuredtwice.com` using the exact DNS records shown in the account; do not guess values or overwrite existing records.
3. Create the audience's hosted email subscribe form. Collect only email (optional first name if needed). Match the teal branding and clearly explain the marketing emails subscribers will receive. Include the appropriate privacy information and affirmative consent; do not preselect consent or add past customers without permission.
4. Enable **double opt-in** for that audience. Check that the hosted form's bot protection is present. Keep the provider's confirmation and unsubscribe flows.
5. Configure the business identity, approved mailing address, permission reminder, and required unsubscribe footer inside Mailchimp. Do not put account credentials, private addresses, or contact exports in this repository.
6. Copy the public HTTPS signup link, not an admin URL, API key, or embedded form POST endpoint. The supported formats are `https://eepurl.com/<code>` and a Mailchimp `list-manage.com/subscribe` URL with only `u` and `id` parameters. Review any other format before changing validation.

## Verify before enabling

With an owner-controlled test email, open the hosted form and verify the business name and correct audience. Submit it and confirm that the address is not subscribed until the email confirmation link is used. Verify delivery, confirmation, repeat signup behavior, and unsubscribe. Check malformed email rejection and bot protection. Do not test using someone else's address.

Record the date and outcome privately; do not commit the test email. Only after these checks, put the public link in `src/treasure-list-config.mjs` and set `signupVerified: true`. This flag records human verification; the website cannot verify account ownership, delivery, or provider settings. Configuration alone does not prove automation works.

Run `npm run build`. Review the homepage and Contact page at 320, 375, 768, and 1440 pixels, with keyboard navigation and enlarged text. Confirm one visible action, readable wrapping, focus visibility, and no overlap with mobile navigation. With JavaScript unavailable, the inactive HTML fallback must remain safe and collect nothing. Repeat a real signup through the enabled link before approval. To disable the integration, set `signupVerified: false`.

Keep PR #24 draft and unmerged until review is complete. Do not publish or merge as part of this setup task.

## Verification performed for this change

`npm run build` checks all public pages, internal links/assets, homepage-only placement, customer contact links, default state, and URL configuration. Node tests cover hostile URLs and enabled/disabled transitions with a DOM contract fixture. These tests do not contact Mailchimp or prove real browser rendering or email delivery. Browser visual review is outstanding because the supported browser QA capability is unavailable in this environment.

## Provider documentation checked October 17, 2026

- [Hosted signup forms](https://mailchimp.com/help/create-a-hosted-signup-form/)
- [Double opt-in](https://mailchimp.com/help/about-double-opt-in/)
- [Signup bot protection](https://mailchimp.com/help/about-recaptcha-for-signup-forms/)
- [Sender domain authentication](https://mailchimp.com/help/set-up-email-domain-authentication/)
- [Email footers](https://mailchimp.com/help/about-campaign-footers/)

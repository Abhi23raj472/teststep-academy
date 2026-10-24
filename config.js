/* TestStep Academy - settings for the mock interview.
   Both values are public, so they are safe to keep in this repository.
   - apiBase: the address of the Cloudflare Worker in worker/, e.g.
     https://teststep-academy-api.your-name.workers.dev
   - googleClientId: the OAuth client ID from Google Cloud Console, which ends in
     .apps.googleusercontent.com (the same value as GOOGLE_CLIENT_ID in worker/wrangler.toml)
   While either is empty, the mock interview page says it is not open yet.
   The setup steps are in the README, under "Mock interview server". */
window.TSA_CONFIG = window.TSA_CONFIG || {
  apiBase: '',
  googleClientId: ''
};

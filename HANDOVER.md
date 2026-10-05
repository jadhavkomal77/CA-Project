# Deployment Notes

## Deploying on Hostinger (current target)

Use hPanel -> Add Website -> **Deploy Web App** (Node.js). The other options
(PHP/HTML, WordPress) cannot run the Express server.

One Node app serves BOTH the website and the API from the same domain. Build
the React app and place it inside the server:

```bash
cd client
npm ci
npm run build            # do NOT set VITE_BACKEND_URL
cp -r dist ../server/dist

cd ../server
npm ci --omit=dev
```

Upload the `server` folder (with `dist` inside it).

Build settings:

| Setting | Value |
|---------|-------|
| Framework preset | Express |
| Node version | 20 or higher |
| Install command | `npm ci --omit=dev` |
| Build command | leave empty (React is already built) |
| Start command | `node index.js` |

### Environment variables

| Variable | Required | Notes |
|----------|----------|-------|
| `MONGO_URL` | YES | MongoDB Atlas connection string |
| `JWT_KEY` | YES | Any long random string |
| `CLOUD_NAME` | YES | Cloudinary — without it ALL image uploads fail |
| `CLOUDINARY_API_KEY` | YES | Cloudinary |
| `CLOUDINARY_API_SECRET` | YES | Cloudinary |
| `FROM_EMAIL` | no | Only for admin "Forgot Password" OTP emails |
| `EMAIL_PASS` | no | Gmail app password, same feature only |

- **Do NOT set `PORT`** — the host assigns it. Setting it makes the site unreachable.
- `NODE_ENV` is NOT required. The website is served whenever `dist/` is present.

### Before go-live

- Enable SSL in hPanel. The admin cookie becomes `Secure` automatically over
  https and stays non-secure on http, so login works either way — but https
  should be on before launch.
- In MongoDB Atlas -> Network Access, allow the server IP (or `0.0.0.0/0` if it
  is not static). Otherwise the app starts but no content loads.

---

## Why the iPhone/iPad admin login was broken

The site ran on `cadmaassociatespvtltd.com` while the API ran on
`ca-project-server.vercel.app`. Those are different sites, so the auth cookie
was **third-party**, and Safari blocks third-party cookies by default. Login
returned 200 but the cookie was discarded, so the next request arrived
unauthenticated and the panel bounced back to the login screen.

Serving the API from the same origin as the site makes the cookie first-party
and fixes it. On Hostinger this happens naturally (one app, one domain).

### If deploying on Vercel instead

`client/vercel.json` proxies `/api` to the backend so the cookie stays
first-party. In that case **`VITE_BACKEND_URL` must be REMOVED** from the
Vercel client project's environment variables — otherwise the built bundle
calls the backend directly, the rewrite is bypassed, and the iPhone bug
returns. All API slices already fall back to a relative `/api` path.

---

## After deploying

- Admin panel: `https://<domain>/adminlogin`
- Test admin login on an actual iPhone to confirm the fix
- Upload one client logo to confirm Cloudinary is configured
- The "Our Clients" section stays hidden until at least one client is added
  (Admin Panel -> Clients)

### Creating the first admin account

If the database has no admin yet (there is no signup screen):

```bash
curl -X POST https://<domain>/api/admin/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Admin","email":"you@example.com","password":"<choose>","phone":"9999999999"}'
```

---

## Known security issues (pre-existing, not yet fixed)

- `POST /api/admin/register` has no authentication — anyone can create an admin
  account on the live site. Recommend adding `adminAuth` to that route once the
  real admin accounts exist.
- `POST/PUT/DELETE /api/adminservice` have no authentication either.

---

## Local development

```bash
docker run -d --name cadna-mongo -p 27017:27017 mongo:7

cd server && cp .env.example .env    # fill it in
npm ci && npm start                  # port 5000 is taken by AirPlay on macOS; use 5001

cd client && npm ci && npm run dev   # leave VITE_BACKEND_URL unset
```

`vite.config.js` proxies `/api` to `http://localhost:5001` and binds to the LAN
so a phone on the same WiFi can reach the dev site for Safari testing.

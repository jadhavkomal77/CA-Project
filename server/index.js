import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import fs from "fs";
import verifyRoutes from "./routes/verifyRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminHeroRoutes from "./routes/adminHeroRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import navbarRoutes from "./routes/navbarRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import settingRoutes from "./routes/admin/settingRoutes.js";
import calculatorRoutes from "./routes/calculatorRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import taxUpdateRoutes from "./routes/taxUpdateRoutes.js";
import aboutTeamRoute from "./routes/aboutTeamRoute.js";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();
const __dirname = path.resolve();

// Hostinger/Vercel terminate SSL and forward the request, so req.secure must
// come from X-Forwarded-Proto rather than the raw socket.
app.set("trust proxy", 1);

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://ca-project-client.vercel.app",
  "https://www.cadmaassociatespvtltd.com",
  "https://cadmaassociatespvtltd.com",
  // Extra origins can be added without a code change:
  // ALLOWED_ORIGINS="https://foo.com,https://bar.com"
  ...(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
];

/* Same-origin requests are always allowed, whatever the domain. On a
   single-server deployment (Hostinger) the site is served from this same
   process, so its origin is whatever host it runs under — hardcoding the
   domain list would make the server reject its own frontend. */
app.use(
  cors((req, callback) => {
    const origin = req.headers.origin;
    const options = {
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    // No Origin header: curl, server-to-server, same-origin GET
    if (!origin) return callback(null, { ...options, origin: true });

    const host = req.headers.host;
    const isSameOrigin =
      origin === `http://${host}` || origin === `https://${host}`;

    if (isSameOrigin || allowedOrigins.includes(origin)) {
      return callback(null, { ...options, origin: true });
    }

    return callback(new Error("Not allowed by CORS"));
  })
);


/* CDN CACHING FOR PUBLIC CONTENT
   These GETs return identical data for every visitor and ignore cookies, so the
   Vercel edge can serve them instead of hitting Mongo on every page load.
   s-maxage = shared/CDN cache only (browsers still revalidate).
   stale-while-revalidate = serve the cached copy instantly, refresh in background,
   so a visitor never waits on the database.

   EXACT paths only. Do NOT loosen these into prefix matches: /api/adminservice/admin
   and /api/footer (no /public) return admin views and must never be edge-cached. */
const CACHEABLE_GET = [
  /^\/api\/(adminnavbar|adminhero|adminabout|footer|pricing|testimonials|projects|clients)\/public\/?$/,
  /^\/api\/projects\/public\/[^/]+\/?$/,
  /^\/api\/adminservice\/?$/,
  /^\/api\/adminservice\/public\/[^/]+\/?$/,
  /^\/api\/settings\/?$/,
];

app.use((req, res, next) => {
  if (req.method === "GET" && CACHEABLE_GET.some((re) => re.test(req.path))) {
    res.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=86400"
    );
  }
  next();
});

/* ROUTES */
app.use("/api/admin", adminRoutes);
app.use("/api/adminservice", serviceRoutes);
app.use("/api/adminhero", adminHeroRoutes);
app.use("/api/adminnavbar", navbarRoutes);
app.use("/api/adminabout", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/calculators", calculatorRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/tax-updates",taxUpdateRoutes );
app.use("/api/about-team", aboutTeamRoute);
app.use("/api/clients", clientRoutes);


/* SINGLE-SERVER DEPLOYMENT (e.g. Hostinger)
   If the React build is present in ./dist, serve it from this same server.
   The frontend and API then share one origin, so the admin auth cookie is
   first-party and Safari/iOS accepts it — no proxy or rewrite needed.

   Gated on the build actually being present, NOT on NODE_ENV — some hosts
   (e.g. Hostinger) do not let you set NODE_ENV, and "is there a build to
   serve?" is the real condition anyway.

   NOTE: the catch-all must be "/*splat", NOT "*". Express 5 uses
   path-to-regexp v8, where a bare "*" throws "Missing parameter name". */
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // Any non-/api route falls through to the SPA so client-side routing works
  // on a hard refresh (e.g. /about-details, /admin/adminclients).
  app.get("/*splat", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Fallback when no frontend build is present (API-only deploys, e.g. Vercel)
app.get("/", (req, res) => {
  res.json("Server is Running! 🚀");
});


const PORT = process.env.PORT || 5000;


if (!process.env.MONGO_URL) {
  console.error("❌ FATAL: MONGO_URL environment variable is missing!");
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅ "))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running locally 🏃‍♀️ on port ${PORT}`);
//   });
// }


/* Vercel is serverless: it imports the exported app and must NOT listen.
   Everywhere else (Hostinger, VPS, local) this process IS the server and must
   listen, including in production — otherwise it connects to Mongo and then
   serves nothing. */
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
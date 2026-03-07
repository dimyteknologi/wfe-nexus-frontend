# 🛡️ OWASP Top 10 Security Analysis — wfe-nexus-frontend

> **Application**: WEF Nexus DSS Frontend  
> **Stack**: Next.js 15.4.8, React 19, next-auth 4, Redux Toolkit + redux-persist, Axios, Zod  
> **Date**: 2026-02-11

---

## Executive Summary

| # | OWASP Category | Status | Findings |
|---|---|---|---|
| A01 | Broken Access Control | 🟢 **RESOLVED** | Middleware added; routes protected |
| A02 | Cryptographic Failures | 🟢 **RESOLVED** | Fallback secret removed; token removed from localStorage |
| A03 | Injection | 🟢 **LOW** | No violations found |
| A04 | Insecure Design | 🟢 **RESOLVED** | JWT expiry check added |
| A05 | Security Misconfiguration | 🟢 **RESOLVED** | Debug disabled; headers added; IPs parameterized |
| A06 | Vulnerable Components | 🟡 **MEDIUM** | Dev deps in production (minor) |
| A07 | Auth & Session Failures | 🟢 **RESOLVED** | Open redirect fixed; logging removed |
| A08 | Data Integrity Failures | 🟡 **MEDIUM** | JWT signature verification (pending server-side check) |
| A09 | Logging & Monitoring | 🟢 **RESOLVED** | Sensitive logs removed |
| A10 | SSRF | 🟢 **LOW** | No vectors found |

---

## Detailed Findings

### A01: Broken Access Control 🔴

#### 1. No Next.js Middleware for Route Protection
- **File**: `middleware.ts` — **DOES NOT EXIST**
- **Impact**: There is **zero server-side route protection**. Any unauthenticated user can directly navigate to `/admin/*` routes. The admin layout at [layout.tsx](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/(admin)/admin/layout.tsx) renders content without any session/auth check.
- **Recommendation**: Create a `middleware.ts` at the project root to intercept requests and verify the session:

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

#### 2. No Client-Side Route Guard on Admin Layout
- **File**: [layout.tsx](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/(admin)/admin/layout.tsx)
- **Impact**: The admin layout is a pure visual wrapper. It renders `children` unconditionally without checking `useSession()` or permissions. Any user (even non-Admin) who reaches this route can interact with admin UI.
- **Recommendation**: Add `useSession` check with redirect:

```tsx
const { data: session, status } = useSession();
if (status === "loading") return <Loading />;
if (!session || session.user.role !== "Admin") {
  redirect("/login");
}
```

---

### A02: Cryptographic Failures 🔴

#### 3. Hardcoded Fallback NEXTAUTH_SECRET
- **File**: [route.ts:90](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L90)
- **Code**: `secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key-please-change-in-production'`
- **Impact**: If `NEXTAUTH_SECRET` is not set (it is absent from `.env`), all JWTs are signed with a publicly visible, predictable key. An attacker can forge valid session tokens.
- **Recommendation**: Remove the fallback. Set `NEXTAUTH_SECRET` in `.env` using `openssl rand -base64 32`. Fail explicitly if missing.

#### 4. Access Token Stored in localStorage
- **File**: [index.ts:93](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/stores/index.ts#L93) — `whitelist: ["scenarios", "auth"]`
- **Impact**: The `auth` slice (including `access_token`) is persisted to **localStorage** via redux-persist. localStorage is accessible to any JavaScript on the page, making it vulnerable to XSS-based token theft.
- **Recommendation**: 
  - Remove `"auth"` from the persist whitelist
  - Rely solely on next-auth's httpOnly cookie-based session
  - If client-side state is needed, store only non-sensitive fields (role, permissions, username)

---

### A03: Injection 🟢

#### 5. No XSS Injection Vectors Found
- No use of `dangerouslySetInnerHTML` or `eval()` in the codebase
- React's default JSX escaping provides baseline XSS protection
- Zod + react-hook-form validate login inputs (email format, min password length)

> [!TIP]
> This is a strong baseline. Maintain this by never using `dangerouslySetInnerHTML` unless absolutely necessary, and always sanitize user input.

---

### A04: Insecure Design 🟡

#### 6. No JWT Token Expiry Validation
- **File**: [route.ts:92-103](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L92-L103)
- **Impact**: The `jwt` callback stores the token but never checks `exp` claim. Expired tokens remain valid in the session indefinitely until the user logs out.
- **Recommendation**: Add expiry check in the `jwt` callback:

```typescript
async jwt({ token, user }) {
  if (user) { /* ... store token ... */ }
  // Check if access token has expired
  if (token.accessToken) {
    const decoded = jwtDecode(token.accessToken as string);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { ...token, error: "TokenExpired" };
    }
  }
  return token;
}
```

#### 7. Session Auto-Refresh Disabled
- **File**: [provider.tsx:17-18](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/stores/provider.tsx#L17-L18)
- **Code**: `refetchOnWindowFocus={false}` and `refetchInterval={0}`
- **Impact**: Sessions are never re-validated after initial login. If a token is revoked server-side, the client continues using it.
- **Recommendation**: Set `refetchInterval={5 * 60}` (5 minute interval) and keep `refetchOnWindowFocus={true}`.

---

### A05: Security Misconfiguration 🔴

#### 8. Debug Mode Enabled in NextAuth
- **File**: [route.ts:17](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L17)
- **Code**: `debug: true`
- **Impact**: NextAuth outputs extensive debug information to server logs, including token payloads and session data.
- **Recommendation**: `debug: process.env.NODE_ENV === 'development'`

#### 9. Hardcoded Internal IP Address as Fallback
- **Files**: [route.ts:14](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L14), [axiosClient.ts:5](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/lib/api/axiosClient.ts#L5), [api.ts:3](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/lib/api/api.ts#L3)
- **Code**: `http://103.63.24.47:4000` (hardcoded in 3 files)
- **Impact**: Exposes internal server IP. If `NEXT_PUBLIC_API_URL` is ever missing, the app silently falls back to a potentially stale or insecure address.
- **Recommendation**: Remove all hardcoded fallbacks. Fail explicitly if env var is missing. Consider using a non-public env var with a Next.js API proxy.

#### 10. No Security Headers (`next.config.ts`)
- **File**: [next.config.ts](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/next.config.ts) — **Empty config**
- **Impact**: Missing `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`, etc.
- **Recommendation**:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};
```

#### 11. Development-Only Headers in Production Code
- **Files**: [api.ts](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/lib/api/api.ts), [baseApi.ts](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/stores/api/baseApi.ts)
- **Code**: `'ngrok-skip-browser-warning': 'true'` in all API requests
- **Impact**: Indicates ngrok tunneling was used during development but the header leaked into production code. Reveals development infrastructure details.
- **Recommendation**: Wrap in environment check or remove entirely.

---

### A06: Vulnerable & Outdated Components 🟡

#### 12. Development Dependencies in Production Context
- **File**: [package.json](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/package.json)
- `json-server` and `express` are listed under `dependencies` (not `devDependencies`). These are dev/mock tools that should not ship to production.
- **Recommendation**: Move `json-server`, `express`, and `@types/express` to `devDependencies`. Run `npm audit` regularly.

---

### A07: Identification & Authentication Failures 🔴

#### 13. Open Redirect via `callbackUrl`
- **File**: [useLogin.ts:76](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/hooks/useLogin.ts#L76)
- **Code**: `const dest = searchParams.get("callbackUrl") || "/"; router.push(dest);`
- **Impact**: An attacker crafts a URL like `/login?callbackUrl=https://evil.com`. After successful login, the user is redirected to the attacker's site (phishing/credential harvest).
- **Recommendation**: Validate that `callbackUrl` is a relative path:

```typescript
const callbackUrl = searchParams.get("callbackUrl") || "/";
const dest = callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") 
  ? callbackUrl 
  : "/";
router.push(dest);
```

#### 14. Excessive Credential/Token Logging
- **File**: [route.ts:27-66](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L27-L66)
- **Impact**: 8 `console.log` statements output user email, login response data (potentially passwords in error scenarios), decoded JWT tokens, and full user objects to server logs. Compromise of logs = compromise of all user sessions.
- **Recommendation**: Remove all `console.log` from the auth route handler. Use structured logging with sensitive field redaction if needed.

#### 15. Empty Authorization Header Sent on Unauthenticated Requests
- **File**: [baseApi.ts:8](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/stores/api/baseApi.ts#L8)
- **Code**: `` headers.set("Authorization", `Bearer ${state.auth?.user?.access_token || ""}`); ``
- **Impact**: When no token exists, sends `Authorization: Bearer ` (with empty string). Some servers may interpret this differently than having no header at all.
- **Recommendation**: Only set the header when a token actually exists.

---

### A08: Software & Data Integrity Failures 🟡

#### 16. JWT Decoded Client-Side Without Signature Verification
- **File**: [route.ts:50](file:///home/yuliussm28/Projects/SideQuest/nexus/wfe-nexus-frontend/src/app/api/auth/[...nextauth]/route.ts#L50)
- **Code**: `jwtDecode<CustomJwtPayload>(token)` — this library only **decodes** JWTs, it does **not verify** signatures.
- **Impact**: The application trusts JWT claims (role, permissions, email) without cryptographic verification. If the API ever returns a tampered or malicious token, the app blindly trusts it.
- **Recommendation**: Verify the JWT signature server-side using `jose` or `jsonwebtoken` with the API's public key, or trust the API response payload directly instead of decoding the token.

---

### A09: Security Logging & Monitoring Failures 🟡

#### 17. Sensitive Data in Server Logs
- Covered in Finding #14. All authentication telemetry is dumped via `console.log` without any log level management or PII redaction.
- No structured error reporting (e.g., Sentry, Datadog) is configured.

---

### A10: Server-Side Request Forgery (SSRF) 🟢

#### 18. No SSRF Vectors Identified
- API base URL is fixed via environment variable. No user-controlled URL construction was found in the frontend.

---

## Priority Remediation Roadmap

| Priority | Finding | Effort |
|---|---|---|
| 🚨 **P0** | #3 — Remove hardcoded NEXTAUTH_SECRET fallback | **5 min** |
| 🚨 **P0** | #14 — Remove all `console.log` from auth route | **10 min** |
| 🚨 **P0** | #1 — Add Next.js middleware for route protection | **30 min** |
| 🔴 **P1** | #13 — Fix open redirect in `useLogin.ts` | **10 min** |
| 🔴 **P1** | #4 — Remove `auth` from redux-persist whitelist | **15 min** |
| 🔴 **P1** | #10 — Add security headers to `next.config.ts` | **20 min** |
| 🟡 **P2** | #6 — Add JWT expiry check | **30 min** |
| 🟡 **P2** | #8 — Disable debug mode for production | **5 min** |
| 🟡 **P2** | #9 — Remove hardcoded IP fallbacks | **15 min** |
| 🟡 **P2** | #7 — Enable session auto-refresh | **5 min** |
| 🟡 **P2** | #11 — Remove ngrok header from production | **10 min** |
| 🟢 **P3** | #12 — Move dev deps to devDependencies | **10 min** |
| 🟢 **P3** | #15 — Conditional Authorization header | **5 min** |
| 🟢 **P3** | #16 — Server-side JWT verification | **1 hr** |

---

## What's Already Good ✅

| Area | Status |
|---|---|
| XSS Protection | React JSX auto-escaping; no `dangerouslySetInnerHTML` or `eval()` |
| Input Validation | Zod schemas with react-hook-form for structured validation |
| Auth Architecture | next-auth with JWT strategy and httpOnly session cookies |
| Password Security | Minimum 6-char requirement enforced client-side |
| State Management | Clean Redux architecture with typed slices |
| API Communication | Consistent Bearer token attachment via interceptors |

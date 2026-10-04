import { rewrite } from "@vercel/functions";

// aavira.made-by-ac.com opens the Aavira restaurant concept site at its root. A static
// index.html exists at "/", and Vercel serves static files before config rewrites, so the
// host-based rewrite has to happen here. Every other host and path is untouched.
export const config = { matcher: "/" };

export default function middleware(request: Request) {
  const host = (request.headers.get("host") || "").toLowerCase();
  if (host === "aavira.made-by-ac.com") return rewrite(new URL("/aavira.html", request.url));
}

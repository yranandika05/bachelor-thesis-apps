import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname.startsWith("/posts")) {
        res.headers.set("Cache-Control", "no-store");
    }

    if (/\.(js|css|woff2?|ttf|otf|png|jpg|jpeg|gif|webp|svg|ico|avif)$/.test(req.nextUrl.pathname)) {
        res.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return res;
}

export const config = {
    matcher: "/:path*",
};

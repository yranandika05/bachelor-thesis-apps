import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/html")) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "no-store");
        return res;
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};

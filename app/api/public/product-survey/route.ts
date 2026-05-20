import { NextResponse } from "next/server";

const BACKEND =
  process.env.NEXT_PUBLIC_SURVEY_ENDPOINT ||
  "https://app.lok-izy.fr/api/public/product-survey";

export async function POST(request: Request) {
  const body = await request.text();

  const res = await fetch(BACKEND, {
    method: "POST",
    headers: {
      "Content-Type": request.headers.get("content-type") || "application/json",
    },
    body,
  });

  const arrayBuffer = await res.arrayBuffer();
  const headers = new Headers(res.headers);

  return new Response(arrayBuffer, {
    status: res.status,
    headers,
  });
}

export async function OPTIONS() {
  // No CORS required since this route is same-origin; respond with allowed methods.
  return NextResponse.json({}, { status: 204, headers: { Allow: "POST,OPTIONS" } });
}

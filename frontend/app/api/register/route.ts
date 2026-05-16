import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

type RegisterBody = {
  full_name?: string;
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterBody;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: body.full_name,
      email: body.email,
      password: body.password,
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      { detail: data?.detail ?? "Registration failed. Try again." },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: response.status });
}

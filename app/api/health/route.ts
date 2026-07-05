import { NextResponse } from 'next/server';

// Liveness probe target for the Docker HEALTHCHECK (Coolify rolling updates).
export function GET() {
  return NextResponse.json({ status: 'ok' });
}

import { NextResponse } from 'next/server';

const mockData = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Administrator', online: true },
  { id: 2, name: 'Peter Johnson', email: 'peter@example.com', role: 'User', online: false },
  { id: 3, name: 'Anna Brown', email: 'anna@example.com', role: 'Moderator', online: true },
  { id: 4, name: 'Elena Williams', email: 'elena@example.com', role: 'User', online: false },
];

export async function GET() {
  return NextResponse.json(mockData);
} 
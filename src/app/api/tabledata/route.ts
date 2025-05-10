// Import Next.js response handler
import { NextResponse } from 'next/server';

/**
 * Mock data array for user table
 * Contains sample user information with ID, name, email, role, and online status
 */
const mockData = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Administrator', online: true },
  { id: 2, name: 'Peter Johnson', email: 'peter@example.com', role: 'User', online: false },
  { id: 3, name: 'Anna Brown', email: 'anna@example.com', role: 'Moderator', online: true },
  { id: 4, name: 'Elena Williams', email: 'elena@example.com', role: 'User', online: false },
];

/**
 * GET handler for /api/tabledata endpoint
 * Returns mock user data as JSON response
 */
export async function GET() {
  return NextResponse.json(mockData);
} 
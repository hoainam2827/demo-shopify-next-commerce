import { revalidate } from '@/lib/shopify';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  return revalidate(req);
}

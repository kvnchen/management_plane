import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json()
  console.log(res);

  return new Response(JSON.stringify({ id: 0 }), {
    status: 200,
    statusText: 'Ok'
  });
}

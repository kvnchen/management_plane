import { type NextRequest } from 'next/server';
import { Environment } from 'interfaces/interfaces';

// fake data
const environments: Environment[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    version: '1.0.0'
  }
];

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(environments), {
    status: 200,
    statusText: 'Ok'
  });
}

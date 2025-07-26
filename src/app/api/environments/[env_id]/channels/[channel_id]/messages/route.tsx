import { type NextRequest } from 'next/server';
import { Message } from 'interfaces/interfaces';

const messages: {
  [key: string]: Message[]
} = {
  'hello': [
    {
      id: 0,
      name: 'sayHelloMessage',
      channel_id: 'hello',
      payload: {
        type: 'string',
        pattern: '^hello .+$'
      }
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ channel_id: string }> }
) {
  const { channel_id } = await params;

  return new Response(JSON.stringify(messages[channel_id]), {
    status: 200,
    statusText: 'Ok'
  });
}

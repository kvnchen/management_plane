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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  let output: Message[] = [];
  Object.keys(messages).map((id) => {
    messages[id].map((obj) => output.push(obj));
  });
  
  if (searchParams.has('channelIds')) {
    const channelIds: Set<string> = new Set((searchParams.get('channelIds') as string).split(','));
    output = output.filter((obj) => channelIds.has(obj.channel_id));
  }

  return new Response(JSON.stringify(output), {
    status: 200,
    statusText: 'Ok'
  });
}

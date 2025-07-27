import { type NextRequest } from 'next/server';
import { Message } from 'interfaces/interfaces';

// fake data
const messages: {
  [key: string]: Message[]
} = {
  '0': [
    {
      id: 0,
      name: 'sayHelloMessage',
      channel_id: 0,
      payload: {
        type: 'string',
        pattern: '^hello .+$'
      }
    }
  ],
  '1': [
    {
      id: 1,
      name: 'userSignedUp',
      channel_id: 1,
      payload: {
        type: 'object',
        properties: {
          userId: {
            type: 'integer',
            description: 'This property describes the ID of the user'
          },
          userEmail: {
            type: 'string',
            description: 'This property describes the Email of the user'
          }
        }
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
    output = output.filter((obj) => channelIds.has(String(obj.channel_id)));
  }

  return new Response(JSON.stringify(output), {
    status: 200,
    statusText: 'Ok'
  });
}

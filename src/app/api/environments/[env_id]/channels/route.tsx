import { type NextRequest } from 'next/server';
import { Channel } from 'interfaces/interfaces';

// fake data
const channels: {
  [key: string]: Channel[]
} = {
  'hello-world': [
    {
      id: 0,
      name: 'hello',
      address: 'hello',
      env_id: 'hello-world'
    },
  ],
  'user-signup': [
    {
      id: 1,
      name: 'userSignedUp',
      address: 'user_signedup',
      env_id: 'user-signup',
      description: 'This channel contains a message per each user who signs up in our application.'
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ env_id: string }> }
) {
  const { env_id } = await params;

  return new Response(JSON.stringify(channels[env_id]), {
    status: 200,
    statusText: 'Ok'
  });
}

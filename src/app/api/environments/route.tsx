import { type NextRequest } from 'next/server';
import { Environment } from 'interfaces/interfaces';

// fake data
const environments: Environment[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    version: '1.0.0',
    servers: []
  },
  {
    id: 'user-signup',
    title: 'User Signup',
    version: '1.0.1',
    servers: [
      {
        id: 0,
        name: 'centralKafkaServer',
        host: 'central.mykafkacluster.org:8092',
        description: 'Kafka broker running in a central warehouse',
        protocol: 'kafka'
      },
      {
        id: 1,
        name: 'westKafkaServer',
        host: 'west.mykafkacluster.org:8092',
        description: 'Kafka broker running in the west warehouse',
        protocol: 'kafka'
      },
      {
        id: 2,
        name: 'eastKafkaServer',
        host: 'east.mykafkacluster.org:8092',
        description: 'Kafka broker running in the east warehouse',
        protocol: 'kafka'
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(environments), {
    status: 200,
    statusText: 'Ok'
  });
}

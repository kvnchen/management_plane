
type Protocol = 'kafka' | 'websocket';

interface Server {
  id: number,
  name: string,
  host: string,
  description?: string,
  protocol: Protocol
}

export interface Environment {
  id: string,
  title: string,
  version: string,
  servers: Server[],
  description?: string
}

export interface Channel {
  id: number,
  name: string,
  address: string,
  env_id: string,
  description?: string
}

interface StringPayload {
  type: 'string',
  pattern: string
}

interface ObjectPayload {
  type: 'object',
  properties: {
    [prop: string] : {
      type: string,
      description?: string
    }
  }
}

export interface Message {
  id: number,
  name: string,
  channel_id: number,
  payload: StringPayload | ObjectPayload
}

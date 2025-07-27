
export interface Environment {
  id: string,
  title: string,
  version: string
}

export interface Channel {
  id: number,
  name: string,
  address: string,
  env_id: string
}

export interface Message {
  id: number,
  name: string,
  channel_id: number,
  payload: any
}

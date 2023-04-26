export type Message = { _id: number, text: string }

export const MessageSchema = {
  name: 'Message',
  properties: {
    _id: 'int',
    text: 'string',
  },
  primaryKey: '_id',
}

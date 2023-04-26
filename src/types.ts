import type { Message } from './models/message.ts';

export type Messages = Realm.Results<Message & Realm.Object<unknown, never>>;
export type App = Realm.App<Realm.DefaultFunctionsFactory, SimpleObject>;
export type Credentials = Realm.Credentials<Realm.Credentials.ApiKeyPayload>;

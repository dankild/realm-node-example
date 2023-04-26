import Realm from 'realm';
import { MessageSchema } from './models/message.ts';
import type { App, Credentials } from './types.ts';
import * as dotenv from 'dotenv';

export default async function startRealm(): Promise<[App, Realm]> {
  dotenv.config();
  const app: App = new Realm.App(process.env.REALM_API_ID);
  const credentials: Credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY);
  await app.logIn(credentials);
  console.log('Logged in to Realm');

  const config = {
    schema: [MessageSchema],
    sync: {
      user: app.currentUser,  // Use the authenticated user.
      flexible: true as true, // Set flexible sync to true to enable sync.
      initialSubscriptions: { // Define initial subscriptions to start syncing data as soon as the realm is opened.
        update(subs, realm): void {
          subs.add(realm.objects("Message")); // Get objects that match your object model
        },
      },
    }
  }

  const realm = await Realm.open(config);
  console.log("Connected DB with Realm");

  return [app, realm];
}

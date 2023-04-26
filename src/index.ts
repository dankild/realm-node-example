import startRealm from './realm.ts';
import type { Message } from './models/message.ts';
import type { Messages } from './types.ts';

const [app, realm] = await startRealm();

const msgs = realm.objects<Message>("Message");

msgs.forEach((msg: Message) => {
  console.log(`${msg._id}: ${msg.text}`);
});

msgs.addListener((msgs: Messages, changes: any) => {
  if (changes.insertions) {
    changes.insertions.forEach((index: number) => {
      console.log(`${msgs[index]._id}: ${msgs[index].text}`);
    });
  };
});

process.stdin.on("data", (text) => {
  app.currentUser.mongoClient("mongodb-atlas").db("dev").collection("Message").insertOne({
    _id: msgs.length,
    text: text.toString().replaceAll('\n', '')
  })
})

const { Client, GatewayIntentBits, MessageActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const config = require('./config.json')

const admin = require("firebase-admin");
const serviceAccount = require("./key.json"); // This is a JSON file you'll get from Firebase


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://discord-firebase-26d48-default-rtdb.firebaseio.com/", // You'll find this in Firebase project settings
});

const db = admin.database()


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');
  const command = args[0];
  console.log(message.content)
  if (command === '!start') {
    const userRef = db.ref(`users/${message.author.id}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      message.reply('You are already registered!');
    } else {
      userRef.set({
        id: message.author.id,
        balance: 0,
        started: true,
        messages: [] // Initialize with an empty object
      })
      .then(() => {
        message.reply('You have been registered!');
      })
      .catch((error) => {
        console.error('Error adding user to database:', error);
        message.reply('There was an error. Please try again later.');
      });
    }
  } else {
    const userRef = db.ref(`users/${message.author.id}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      const messagesRef = userRef.child('messages');
      const messageId = messagesRef.push().key;

      messagesRef.child(messageId).set({
        content: message.content,
        timestamp: admin.database.ServerValue.TIMESTAMP
      });

    } else {
      message.reply('You are not registered! Use !start to register.');
    }
  }
});

client.login(config.token);

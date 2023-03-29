import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import {Client, GatewayIntentBits} from 'discord.js'
// import readline from "readline"

//Invoking dotenv package
config()

// Configurations to connect to Discord
const client = new Client( {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})



// Configuration to connect to OpenAI API
const openai = new OpenAIApi( new Configuration( {
  organization: process.env.CHATGPT_ORG_ID,
  apiKey: process.env.CHATGPT_API
} ) )


// Checking for user messages in Discord
client.on( 'messageCreate', async function ( message ) {
  try {
  
    if(message.author.bot) return

    const gptResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant who responds succinctly' },
        { role: 'user', content: message.content },
      ],
      // temperature: 0.9,
      // max_token: 100,
    });
   return message.reply(`${gptResponse.data.choices[0].message.content}`);

} catch (error) {
  console.log(error);
}
})


// Log ChatGPT to Discord
client.login(process.env.DISCORD_TOKEN);
console.log('ChatGPT is Online');


// For using the command line prompt for chat

// userInterface.prompt()

// userInterface.on( "line", async input => {
//   const res = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: input }],
//     } )
//   console.log(res.data.choices[0].message.content);
// })
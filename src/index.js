const Discord = require("discord.js");
const sleep = require("system-sleep");
const config = require("./storage/config.json") 

const client = new Discord.Client(); 

client.on("ready", () => {
    audioloop(client); 
    client.user.setActivity("🎶 24/7 Music 🎶", { type: "PLAYING" }); 
    console.log(`${client.user.username} ready!`); 
});

client.login(config.token);

async function audioloop() {
    const guild = client.guilds.cache.get(config.guildid); 
    const waitingroom = guild.channels.cache.get(config.voicechannel);

    var connection = await waitingroom.join();
    await connection.voice.setSelfDeaf(true); 
    await connection.voice.setDeaf(true); 

    const dispatcher = connection.play('./storage/audio.mp3');
    dispatcher.on("finish", end => {
        waitingroom.leave();
        sleep(300);
        audioloop();
    });
}
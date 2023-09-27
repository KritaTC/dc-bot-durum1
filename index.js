const Discord = require('discord.js');

require('dotenv').config();
require('colors');

const client = global.client = new Discord.Client({
    intents: [32767, Discord.GatewayIntentBits.MessageContent],
    presence: { status: 'idle', activities: [{ name: '.gg/94fbr', type: 3 }] }
}); console.clear();

client.login(process.env.Token)
    .then(async c => await console.log(`\n\n  The Bot has been Activated on:`.magenta + ` ${client.guilds.cache.size} servers `.blue + `\n  Bot Name:`.magenta + ` ${client.user.tag} \n\n`.blue));

setInterval(async () => {
    let guild = client.guilds.cache.get('1149682106096697475');
    if (!guild) return console.log('Guild ID\'si Belirtilmemiş'.red);
    let role = guild.roles.cache.get('1152741846414528513');
    if (!role) return console.log('Role ID\'si Belirtilmemiş'.red);
    let channel = guild.channels.cache.get('1156228876104634498');
    if (!channel) return console.log('Kanal ID\'si Belirtilmemiş'.red);

    await guild.members.cache.map(async m => {
        let status = m.presence?.activities.map(pre => pre.state).join() || '';
        let control = status.includes('.gg/94fbr');

        if (!control) {
            if (m.roles.cache.has(role.id)) {
                await m.roles.remove(role.id);
                return await channel.send({ embeds: [{ color: 0xf43f5e, description: `${m} adlı kullanıcı durumundan URL'mizi çıkardı. (\`Yeni durumu: ${status}\`)` }] });
            }
        }

        if (control) {
            if (!m.roles.cache.has(role.id)) {
                await m.roles.add(role.id);
                return await channel.send({ embeds: [{ color: 0x10b981, description: `${m} adlı kullanıcı durumuna URL'mizi ekledi. (\`Yeni Durumu: ${status}\`)` }] });
            }
        }
    });

}, 1000 * 30 * 1);
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const Guild = require('./models/guild');
const antilinks = require('./models/antilinks');
const prefix = '$';
client.on('ready', async() => console.log('Ready'));
mongoose.connect('mongodb+srv://work:work123@cluster0.e0df5.mongodb.net/work?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

client.on('message', async(message) => {
    if(message.author.bot) return;
    let args = message.content.split(' ');
    if(args[0].toLowerCase() === `${prefix}warn`) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if(!user) return message.channel.send(`**:x: | Usage: ${prefix}warn <@User> <Reason>**`);
    Guild.findOne({Guild: message.guild.id, User: user.user.id}, (err, doc) => {
        if(err) console.error(err);
        if(!doc) {
            let newWarns = new Guild({
                User: user.user.id,
                Guild: message.guild.id,
                Warns: [
                    {
                        Moderator: message.author.id,
                        Reason: args.slice(2).join(' ')
                    }
                ]
            })
            newWarns.save();
            message.channel.send(`**Done Has Warn ${user}**`);
        } else {
            doc.Warns.unshift({
                Moderator: message.author.id,
                Reason: args.slice(2).join(' ')
            })
            doc.save();
            message.channel.send(`**Done Has Warn ${user}**`);
        }
    })
}    
})
        
client.on('message', async(message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + 'warns')) {
    let args = message.content.split(' ');
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if(!user) return message.channel.send(`**:x: | Usage: ${prefix}warn <@User> <Reason>**`);
    Guild.find({Guild: message.guild.id, User: user.user.id}, async(err, data) => {
        if(err) console.error(err);
        if(!data.length) return message.channel.send(`**Not Has Any Warn**`);
        let embed = new Discord.MessageEmbed().setColor('#36393e').setTitle(`${user.user.tag} Warns on ${message.guild.name}`).setDescription(data.map(d => {
            return d.Warns.map((w, i) => `**#${i+1}**: Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag}, Reason: ${w.Reason}`).join("\n")
        }))
        message.channel.send(embed)
        
    })
}    
});



client.on('message', async(message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + 'antilink_on')) {
        message.channel.send(`**Done The AntiLinks now is on**`);
        antilinks.findOne({Guild: message.guild.id}, (err, doc) => {
            if(err) console.error(err);
            if(!doc) {
                let newLinks = new antilinks({
                    Guild: message.guild.id,
                    run: 'on'
                })
                newLinks.save();
                message.channel.send(`**Done The AntiLinks now is on**`);
            } else {
                doc.run = 'on';
                doc.save();
                message.channel.send(`**Done The AntiLinks now is on**`);
            }
        })}    
});

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + 'antilink_off')) {
        message.channel.send(`**Done The AntiLinks now is off**`);
        antilinks.findOne({Guild: message.guild.id}, (err, doc) => {
            if(err) console.error(err);
            if(!doc) {
                let newLinks = new antilinks({
                    Guild: message.guild.id,
                    run: 'off'
                })
                newLinks.save();
                message.channel.send(`**Done The AntiLinks now is off**`);
            } else {
                doc.run = 'off';
                doc.save();
                message.channel.send(`**Done The AntiLinks now is off**`);
            }
        })
    }    
});
client.on('message', async(message) => {
    let data = await antilinks.findOne({Guild: message.guild.id});
    if(data.run === 'off') return;
    if(data.run === 'on') {
        if(links(message.content) === true) {
            message.delete()       
    }
}
})

function links(str) {
    let regexp = /^(?:(?:discord.gg?|https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }


client.login('NzYwNTI1MzI4NDUwOTc3Nzky.X3NUaA.SxvMxjhDsaiTcmtheMRoqKMyd9w')
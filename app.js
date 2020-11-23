const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const Guild = require('./models/guild');
const antilinks = require('./models/antilinks');
const prefix = '$';
client.on('ready', async() => console.log('Ready'));
mongoose.connect('MongoDBLink', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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


client.login('TOKEN HERE');

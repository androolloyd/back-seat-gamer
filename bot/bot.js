var irc  = require('irc');
var client = new irc.Client('irc.twitch.tv', 'androollloyd86', {
    userName: "androolloyd86",
    password: "oauth:ku3ax0ezketyafgnkkixf1lw11s19hm",
    channels: ['#androolloyd86'],
    autoConnect: true
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

client.addListener('message#yourchannel', function (from, message) {
    console.log(from + ' => #yourchannel: ' + message);
});
client.join("#androolloyd86",function(err){
    if(err)
        return 500;
});

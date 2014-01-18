var irc  = require('irc');
var client = new irc.Client('irc.twitch.tv', 'androolloyd86', {
    channels: ['#androolloyd86'],
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



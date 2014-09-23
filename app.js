var irc = require('irc');
var Lipsum = require('node-lipsum');
var lipsum = new Lipsum();
var lipsumOpts = {
  start: 'no',
  what: 'paras',
  amount: 2
};

var client = new irc.Client('irc.freenode.net', 'pod-bot', {
	debug: true,
    channels: ['#lugati'],
});


client.addListener('error', function(message) {
    console.log('error: ', message);
});


client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
    
    

});


client.addListener('message', function (from, to, message) {
    console.log('%s => %s: %s', from, to, message);

    if ( to.match(/^[#&]/) ) {
        // channel message
        if ( message.match(/hello/i) ) {
            client.say(to, 'Hello there ' + from);
        } else if ( message.match(/dance/) ) {
            setTimeout(function () { client.say(to, "\u0001ACTION dances: :D\\-<\u0001") }, 1000);
            setTimeout(function () { client.say(to, "\u0001ACTION dances: :D|-<\u0001")  }, 2000);
            setTimeout(function () { client.say(to, "\u0001ACTION dances: :D/-<\u0001")  }, 3000);
            setTimeout(function () { client.say(to, "\u0001ACTION dances: :D|-<\u0001")  }, 4000);
        } else if(message.match(/!help/)) {
	    	client.say(to, "!help:");
	    	client.say(to, "!give me op");
	    	client.say(to, "!give op [to nick]");
	    } else if(message.match(/give me op/)) {
	    	client.send('MODE', to, '+o', from);

	    } else if(message.indexOf('!give op') > -1) {
	    	var nick = message.split(' ');
	    	client.send('MODE', to, '+o', nick[2]);
	    } else if(message.match(/bot burro/)) {
	    	client.say(to, "I'm a bot!");
	    } else if(message.match(/quem eh o mais lindo aqui?/)) {
	    	client.say(to, "o "+ from + " eh o mais gato!!");
	    } else if(message.match(/cagar/)) {
	    	client.say(to, from + " seu cagão!!");
	    } else if(message.match(/feio/)) {
	    	client.say(to, "o "+ from + " tu eis o mais feio!!");
	    } else if(message.match(/fala bot/)) {
	    	lipsum.getText(function(text) {
			  client.say(to,text);
			}, lipsumOpts);
	    }
    }
    else {
        // private message
    }
});


client.addListener('pm', function(nick, message) {
    console.log('Got private message from %s: %s', nick, message);
});
client.addListener('join', function(channel, who) {
    console.log('%s has joined %s', who, channel);
    client.send('MODE', channel, '+o', who);
});
client.addListener('part', function(channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
});
client.addListener('kick', function(channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});
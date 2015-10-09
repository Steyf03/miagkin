Template.gameBoard.helpers
({
	time: function ()
	{
		var time = Session.get('time') || new Date();
		return time;
	},
	gameDuration: function ()
	{
		var timeDiff = Math.abs(Session.get('time').getTime() - this.createdAt.getTime());
		var totalSec = Math.ceil(timeDiff / 1000);
		var hours = parseInt(totalSec / 3600) % 24;
		var minutes = parseInt(totalSec / 60) % 60;
		var seconds = totalSec % 60;
		if(hours > 0) var timeString = hours < 10 ? "0" + hours + "h" : hours + "h";
		else var timeString = "";
		timeString += minutes < 10 ? "0" + minutes + "m" : minutes + "m";
		timeString += seconds < 10 ? "0" + seconds + "s" : seconds + "s";
		return timeString;
	}
});

Meteor.subscribe('games');
Meteor.subscribe('cards');

Meteor.setInterval(function () {
	Session.set('time', new Date);
}, 1000);
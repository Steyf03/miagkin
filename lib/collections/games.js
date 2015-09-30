Games = new Mongo.Collection('games');

Games.allow({
	update: function(userId, game) { return ownsDocument(userId, game); },
	remove: function(userId, game) { return ownsDocument(userId, game); }	
});

Meteor.methods({

	gameInsert: function() {

		var user = Meteor.user();
		var game = {
			leaderId: user._id,
			author: user.username,
			players : [{
				"id": user._id,
				"name" : user.username,
				"ready" : false
			}],
			nbPlayers : 1
		};

		var gameId = Games.insert(game);

		return {
			_id: gameId
		};
	}

});
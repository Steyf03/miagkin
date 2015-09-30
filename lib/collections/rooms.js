Rooms = new Mongo.Collection('rooms');

Rooms.allow({
	update: function(userId, room) { return ownsDocument(userId, room); },
	remove: function(userId, room) { return ownsDocument(userId, room); }	
});

Rooms.deny({
	update: function(userId, room, fieldNames) {
		// may only edit the name field:
		return (_.without(fieldNames, 'name').length > 0);
	}
});

Meteor.methods({

	roomInsert: function(roomAttributes) {
		check(Meteor.userId(), String);
		check(roomAttributes, {
			name: String,
		});

		var roomWithSameName = Rooms.findOne({name: roomAttributes.name});
			if (roomWithSameName) {
				return {
					roomExists: true,
					_id: roomWithSameName._id
			}
		}

		var user = Meteor.user();
		var room = _.extend(roomAttributes, {
			leaderId: user._id,
			author: user.username,
			players : [{
				"id": user._id,
				"name" : user.username,
				"ready" : false
			}],
			nbPlayers : 1,
			gameState : "Waiting"
		});

		var roomId = Rooms.insert(room);

		return {
			_id: roomId
		};
	},
	roomJoin: function(roomId) {
		check(Meteor.userId(), String);

		var user = Meteor.user();

		Rooms.update(roomId, {
			$inc : {nbPlayers : 1},
			$push : {players : {
				"id": user._id,
				"name" : user.username,
				"ready" : false
			}}
		});

		return {
			_id: roomId
		};
	},
	roomReady : function(roomId, playerPos, isReady)
	{
		var setModifier = { $set : {} };
		setModifier.$set['players.' + playerPos + '.ready'] = isReady;
		Rooms.update(
			{'_id' : roomId}, setModifier);
	},
	roomState : function(roomId, newState, gameId)
	{
		Rooms.update(roomId, {
			$set : {gameState : newState, gameId : gameId}
		});
	}

});
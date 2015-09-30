Template.roomBoard.helpers
({
});

Template.roomBoard.events({
	'click .roomLaunch': function(e) {
		e.preventDefault();

		// Count number of ready, if all players are ready launch the game
		var currentRoom = Rooms.findOne(Template.parentData(1)._id);
		var countReady = 0;
		for(var i = 0; i < currentRoom.players.length; i++)
		{
			if (currentRoom.players[i].ready == true) countReady++;
		}
		if(countReady == currentRoom.nbPlayers) 
		{
			Meteor.call('gameInsert', function(error, result) {
				// display the error to the user and abort
				if (error)
					return alert(error.reason);

				Meteor.call('roomState', currentRoom._id, "Playing", result._id, function(error, result) {
					// display the error to the user and abort
					if (error)
						return alert(error.reason);
				});

				Router.go('gameBoard', {_id: result._id});
			});
		}
	}
});
Template.roomPlayer.helpers
({
	ownRoom: function()
	{
		return Template.parentData(1).leaderId === this.id;
	},
	isUser: function()
	{
		return this.id === Meteor.userId();
	},
	isReady: function()
	{
		return this.ready === true;
	}
});

Template.roomPlayer.events({
	'click .roomReady': function(e) {
		e.preventDefault();

		var currentRoomId = Template.parentData(1)._id;
		var isReady = !this.ready;
		var playerPos = -1;
		var i = 0;

		// Get player position in array
		while(playerPos == -1 || i < Template.parentData(1).players.length)
		{
			if (Template.parentData(1).players[i].id === this.id) playerPos = i;
			i++;
		}

		Meteor.call('roomReady', currentRoomId, playerPos, isReady, function(error, result) {
			// display the error to the user and abort
			if (error)
				return alert(error.reason);
		});
		
		// Count number of ready, if all players are ready launch the game
		var currentRoom = Rooms.findOne(Template.parentData(1)._id);
		var countReady = 0;
		for(var i = 0; i < currentRoom.players.length; i++)
		{
			if (currentRoom.players[i].ready == true) countReady++;
		}
		if(countReady == currentRoom.nbPlayers) 
		{

			Router.go('gameBoard', {_id: result._id});
		}
	}
});
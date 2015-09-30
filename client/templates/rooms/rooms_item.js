Template.roomsItem.helpers
({
	gameStarted: function()
	{
		return this.gameState === "Playing";
	},
	ownRoom: function()
	{
		return this.leaderId === Meteor.userId();
	},
	inRoom: function()
	{
		for(var i = 0; i < this.players.length; i++)
		{
			if(this.players[i].id === Meteor.userId()) return true;
		}
		return false;
	},
	playersCount: function()
	{
		if (this.nbPlayers < 2) return this.nbPlayers + " player";
		return this.nbPlayers + " players";
	}
});

Template.roomsItem.events({
	'click .gameEnter': function(e) {
		e.preventDefault();
		Router.go('gameBoard', {_id: this.gameId});
	},
	'click .roomJoin': function(e) {
		e.preventDefault();

		Meteor.call('roomJoin', this._id, function(error, result) {
			// display the error to the user and abort
			if (error)
				return alert(error.reason);

			Router.go('roomBoard', {_id: result._id});
		});
	},
	'click .roomDelete': function(e) {
		e.preventDefault();
		
		if (confirm("Delete this room ?")) {
			Rooms.remove(this._id);
			//Router.go('roomsList');
		}
	}
});
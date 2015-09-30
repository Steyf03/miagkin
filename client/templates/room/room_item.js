Template.roomItem.helpers
({
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

Template.roomItem.events({
	'click .roomDelete': function(e) {
		e.preventDefault();
		
		if (confirm("Delete this room ?")) {
			Rooms.remove(this._id);
			Router.go('roomsList');
		}
	}
});
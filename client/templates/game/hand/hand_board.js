Template.handBoard.helpers
({
	cards: function()
	{
		return Cards.find({}, {sort: {submitted: -1}});
	}
});

Meteor.subscribe('games');
Meteor.subscribe('cards');

var deck = Cards.find({}, {sort: {submitted: -1}});
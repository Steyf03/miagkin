Meteor.publish('rooms', function() {
	return Rooms.find();
});

Meteor.publish('games', function() {
	return Games.find();
});

Meteor.publish('cards', function() {
	return Cards.find();
});
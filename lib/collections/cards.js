Cards = new Mongo.Collection('cards');

Meteor.methods({

	cardInsert: function(cardAttributes) {

		var card = cardAttributes;

		var cardId = Cards.insert(cardAttributes);

		return {
			_id: cardId
		};
	}

});
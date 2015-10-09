Template.cardManagementCreate.events({
	'submit form': function(e) {
		e.preventDefault();

		// Processing the values entered by user
		var leftValues = $(e.target).find('[name=left]').val();
		var leftValues = leftValues.split(",");
		var bonusValues = $(e.target).find('[name=bonus]').val();
		var bonusValues = bonusValues.split(",");
		var bonusArray = [];
		for(var i = 0; i < bonusValues.length; i+=2)
		{
			bonusArray[i/2] = { value : bonusValues[i], type : bonusValues[i+1] };
		}

		var card = {
			deck: $(e.target).find('[name=deck]').val(),
			type: $(e.target).find('[name=type]').val(),
			name: $(e.target).find('[name=name]').val(),
			desc: $(e.target).find('[name=desc]').val(),
			left: leftValues,
			right: $(e.target).find('[name=right]').val(),
			bonus: bonusArray,
			condition: $(e.target).find('[name=restriction]').val()+$(e.target).find('[name=condition]').val()
		};

		Meteor.call('cardInsert', card, function(error, result) {
			// display the error to the user and abort
			if (error)
				return alert(error.reason);

			Router.go('roomsList');
		});
	}
});
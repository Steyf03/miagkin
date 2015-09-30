Template.cardManagementCreate.events({
	'submit form': function(e) {
		e.preventDefault();

		// Processing the values entered by user
		var leftValues = $(e.target).find('[name=left]').val();
		var leftValues = leftValues.split(",");
		var rightValues = $(e.target).find('[name=right]').val();
		var rightValues = rightValues.split(",");
		var rightArray = [];
		for(var i = 0; i < rightValues.length; i+=2)
		{
			rightArray[i/2] = { value : rightValues[i], type : rightValues[i+1] };
		}

		var card = {
			deck: $(e.target).find('[name=deck]').val(),
			type: $(e.target).find('[name=type]').val(),
			name: $(e.target).find('[name=name]').val(),
			desc: $(e.target).find('[name=descleft]').val(),
			left: leftValues,
			right: rightArray,
			bonus: $(e.target).find('[name=bonus]').val(),
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
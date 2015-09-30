Template.roomsCreate.events({
	'submit form': function(e) {
		e.preventDefault();

		var room = {
			name: $(e.target).find('[name=name]').val()
		};

		Meteor.call('roomInsert', room, function(error, result) {
			// display the error to the user and abort
			if (error)
				return alert(error.reason);
			
			// show this result but route anyway
			if (result.roomExists)
				return alert('This link has already been posted');

			Router.go('roomBoard', {_id: result._id});
		});
	}
});
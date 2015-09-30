Template.roomsEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentRoomId = this._id;

		var roomProperties = {
			name: $(e.target).find('[name=name]').val()
		}

		Rooms.update(currentRoomId, {$set: roomProperties}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Router.go('roomBoard', {_id: currentRoomId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();
		
		if (confirm("Delete this room ?")) {
			var currentRoomId = this._id;
			Rooms.remove(currentRoomId);
			Router.go('roomsList');
		}
	}
});
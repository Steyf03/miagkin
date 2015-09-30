Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () { return Meteor.subscribe('rooms'); }
});

// Rooms
Router.route('/', {name: 'roomsList'});

Router.route('/rooms/:_id/edit', {
	name: 'roomsEdit',
	data: function() { return Rooms.findOne(this.params._id); }
});

Router.route('/room/:_id', {
	name: 'roomBoard',
	data: function() { return Rooms.findOne(this.params._id); }
});

Router.route('/create', {name: 'roomsCreate'});

// Games
Router.route('/game/:_id', {
	name: 'gameBoard',
	data: function() { return Games.findOne(this.params._id); }
});

// Cards
Router.route('/createcard', {name: 'cardManagementCreate'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'roomsPage'});
Router.onBeforeAction(requireLogin, {only: 'roomsCreate'});
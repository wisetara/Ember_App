App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function() {
  	this.resource('product', { path: '/:product_id' });
  });
  this.resource('contacts', function() {
  	this.resource('contact', { path: '/:contact_id '});
  });
});

//This is often defined by Ember, and isn't always defined.
//CONTROLLERS are often created by Ember.
App.IndexController = Ember.Controller.extend({
	productsCount: 2,
	logo: 'images/logo.png',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});

App.ContactsIndexController = Ember.Controller.extend({
	contactName: 'Anostagia',
	avatar: 'images/avatar.png',
	open: function() {
		return ((new Date()).getDay() === 0) ? "Closed" : "Open";
	}.property()
});
//This is often defined by Ember, and isn't always defined.
//ROUTES are often created by Ember.
App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

//THIS COULD BE DELETED! EMBER IS SMART!
App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('product', params.product_id);
	}
});

App.ContactsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('contact');
	}
});

App.ContactRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('contact', params.contact_id);
	}
});

//MODELS
App.Product = DS.Model.extend({
	title: DS.attr('string'),
	price: DS.attr('number'),
	description: DS.attr('string'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string')
});

App.Product.FIXTURES = [
  {
    id: 1,
    title: "Flint",
    price: 99,
    description: "Flint is...",
    isOnSale: true,
    image: 'images/flint.png'
  },
  {
    id: 2,
    title: "Kindling",
    price: 249,
    description: "Easily...",
    isOnSale: false,
    image: 'images/kindling.png'
  }
];

App.Contact = DS.Model.extend({
	name: DS.attr(),
	avatar: DS.attr(),
	about: DS.attr()
});

App.Contact.FIXTURES = [
  {
    id: 1,
    name: "Flint Edwards",
    avatar: 'images/contacts/flint.png',
    about: 'Whatever'
  },
  {
    id: 2,
    name: "Kindling Smith",
    avatar: 'images/contacts/kindling.png',
    about: 'Whatever'
  }
];

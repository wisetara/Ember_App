App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.route('about');
  this.resource('products', function() {
  	this.resource('product', { path: '/products/:title' });
  });
  this.resource('contacts');
  this.resource('contact', { path: '/contact/:name '});
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

App.AboutController = Ember.Controller.extend({
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
		return App.PRODUCTS;
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		return App.PRODUCTS.findBy('title', params.title);
	}
});

App.ContactsRoute = Ember.Route.extend({
	model: function() {
		return App.CONTACTS;
	}
});

App.ContactRoute = Ember.Route.extend({
	model: function(params) {
		return App.CONTACTS.findBy('name', params.name);
	}
});

//MODELS
App.PRODUCTS = [
	{
		title: "Flint",
		price: 99,
		description: "Flint is...",
		isOnSale: true,
		image: 'images/flint.png'
	},
	{
		title: "Kindling",
		price: 249,
		description: "Easily...",
		isOnSale: false,
		image: 'images/kindling.png'
	}
];
App.CONTACTS = [
  {
    name: "Flint Edwards",
    avatar: 'images/contacts/flint.png',
    about: 'Whatever'
  },
  {
    name: "Kindling Smith",
    avatar: 'images/contacts/kindling.png',
    about: 'Whatever'
  }
];

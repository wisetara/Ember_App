App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//To use a RESTful server instead of fixtures,
//host the info in JSON style on a server or elsewhere, and use
//App.ApplicationAdapter = DS.RESTAdapter.extend();

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function() {
  	this.resource('product', { path: '/:product_id' });
    this.route('onsale');
    this.route('deals');
  });
  this.resource('contacts', function() {
  	this.resource('contact', { path: '/:contact_id '});
  });
});

//This is often defined by Ember, and isn't always defined.
//CONTROLLERS are often created by Ember.
App.IndexController = Ember.ArrayController.extend({
	productsCount: function() {
    return this.get('length');
  }.property('length'),//this asks the controller to keep an eye on things.
  //A shorthand way of doing the above: products.Count: Ember.computed.alias('length')
	logo: 'images/logo.png',
	time: function() {
		return (new Date()).toDateString()
	}.property(),
  onSale: function() {
    //return this.filter(function(product) {
      //return product.get('isOnSale').slice(0,3);
      return this.filterBy('isOnSale').slice(0,3);
    //});
  }.property('@each.isOnSale')
});

App.ContactsController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

App.ContactsIndexController = Ember.ObjectController.extend({
  contactName: Ember.computed.alias('name')
});

App.ProductsController = Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: true //you don't need this line unless you want it to be false! Also,
  //you only need to sort here because we're using fixtures. Otherwise, sort in the route.
});


//This is often defined by Ember, and isn't always defined.
//ROUTES are often created by Ember.
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
    //If not using fixtures, you can sort here:
    //return this.store.find('product', { order: 'title'});
	}
});

App.ProductsOnsaleRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('products').filterBy('isOnSale');
  }
});

App.ProductsDealsRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('products').filter(function(product) {
      return product.get('price') < 500;
    });
  }
});

App.ProductsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ContactsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contact', 2);
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
	image: DS.attr('string'),
  reviews: DS.hasMany('review', {async: true}),
  crafter: DS.belongsTo('contact', {async: true})
});

App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  avatar: DS.attr('string'),
  about: DS.attr('string'),
  products: DS.hasMany('product', { async: true })
});

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});

/*FIXTURES
//In a RESTful server situation, these would be in a JSON "Products" file (perhaps)
//And the syntax would be
{ "products": [
    {
      "id": 1,
      "title": "Flint",
      "price": 99,
      "description": "Flint is...",
      "inOnSale": true,
      "image": "/assets/products/flint.png",
      "reviews": [100,101]
    }, {...}
  ],
  "reviews": [
    {"id": 100, "product": 1, "text": "Started a fire in no time"}, ...
  ]
}

  ]*/
App.Product.FIXTURES = [
  {
    id: 1,
    title: "Flint",
    price: 99,
    description: "Flint is...",
    isOnSale: true,
    image: 'images/flint.png',
    reviews: [100,101],
    crafter: 1
  },
  {
    id: 2,
    title: "Kindling",
    price: 249,
    description: "Easily...",
    isOnSale: false,
    image: 'images/kindling.png',
    reviews: [],
    crafter: 2
  }
];

App.Contact.FIXTURES = [
  {
    id: 1,
    name: "Flint Edwards",
    avatar: 'images/contacts/flint.png',
    about: 'Whatever',
    products: [1]
  },
  {
    id: 2,
    name: "Kindling Smith",
    avatar: 'images/contacts/kindling.png',
    about: 'Whatever',
    products: [2]
  }
];

App.Review.FIXTURES = [
  {
    id: 100,
    product: 1,
    text: "Started a fire in no time!"
  },
  {
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
  }
]

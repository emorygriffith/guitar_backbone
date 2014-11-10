(function () {

  App.Models.Guitar = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      type: '',
      make: '',
      model: '',
      price: '',
      comments: ''
    },

    initialize: function () {
      var t = this.get('make');
      console.log(t + " has been added");
    }

  });

}());

(function () {

  App.Collections.Guitars = Backbone.Collection.extend({
    model: App.Models.Guitar,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/emoryguitars'
  });

}());

(function () {

  App.Views.AddGuitar = Backbone.View.extend({

    el: '#guitarForm',

    events: {
      'submit #addGuitar' : 'addGuitar'
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.html($('#addTemp').html());
    },

    addGuitar: function (e) {
      e.preventDefault();

      var g = new App.Models.Guitar({
        type: $('#guitar_type').val(),
        make: $('#guitar_make').val(),
        model: $('#guitar_model').val(),
        price: $('#guitar_price').val(),
        comments: $('#guitar_comments').val(),
      });

      App.guitars.add(g).save();

    }





  });


}());

(function () {

  App.Views.SingleGuitar = Backbone.View.extend({

    tagName: 'ul',
    className: 'guitarSingle',

    events: {
      'submit #updateGuitar' : 'updateGuitar',
      'click #delete' : 'deleteGuitar'
    },

    template: _.template($('#singleTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#guitarForm').empty();

      // Get our Element On Our Page
      $('#guitarList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.guitar.toJSON()));

    },

    updateGuitar: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.guitar.set({
        make: $('#update_make').val(),
        model: $('#update_model').val(),
        comments: $('#update_comments').val(),
        price: $('#update_price').val()
      });


      // Save Instance
      this.options.guitar.save();


      // Go back to our home page
      App.router.navigate('', {trigger: true});

    },

    deleteGuitar: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.guitar.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {


  App.Views.ListGuitar = Backbone.View.extend({

    tagName: 'ul',
    className: 'allGuitars',

    events: {

      'click li' : 'gotoEdit'
    },

    template: _.template($('#listTemp').html()),



    initialize: function() {

      this.render();

      this.collection.on('sync', this.render, this);


      // Get our Element On Our Page
      $('#guitarList').html(this.$el);

    },

    render: function () {
        var self = this;

        // Empty out
        this.$el.empty();

        this.collection.each(function (c) {
          self.$el.append(self.template(c.toJSON()));
        });

        return this;
      },

    gotoEdit: function (e) {
     e.preventDefault();

     var editID = $(e.currentTarget).attr('id');
     App.router.navigate('edit/'+editID, {trigger: true});
    }

  });


}());

(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:guitarID' : 'editGuitar'

    },

    home: function () {
      new App.Views.AddGuitar();
      new App.Views.ListGuitar({ collection: App.guitars });

    },

    editGuitar: function (guitarID) {

      var c = App.guitars.get(guitarID);

      new App.Views.SingleGuitar({ guitar: c });
    }




  });

}());

(function () {

  // Create Instance of Collection
  App.guitars = new App.Collections.Guitars();

  // Fetch any server-side coffees
  App.guitars.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });

}());

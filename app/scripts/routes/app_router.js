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

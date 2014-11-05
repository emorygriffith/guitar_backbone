(function () {

  App.Collections.Guitars = Backbone.Collection.extend({
    model: App.Models.Guitar,
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/emoryguitars'
  });

}());

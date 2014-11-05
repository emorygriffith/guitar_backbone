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

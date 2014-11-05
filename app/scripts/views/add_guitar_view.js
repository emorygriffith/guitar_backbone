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

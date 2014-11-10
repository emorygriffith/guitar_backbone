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

(function () {



  App.Views.ListGuitar = Backbone.View.extend({

    tagName: 'ul',
    className: 'allGuitars',

    events: {
      
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
      }




  });


}());

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

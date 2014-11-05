(function () {

  // Create Instance of Collection
  App.guitars = new App.Collections.Guitars();

  // Fetch any server-side coffees
  App.guitars.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });

}());

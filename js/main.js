
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.


var Song = Backbone.Model.extend({
    idAttribute: "songId",
    urlRoot: "/api/songs",
    defaults: {
        downloads: 0
    },
    validate: function(attrs) {
        if(!attrs.title)
        return "Title is required.";
    }
});

var song = new Song({ songId: 1, title: "Happy"});



# Backbone.JS Tutorial

Udemy Course
Mosh Hamedani

## Backbone Models Cheat Sheet

### Creating Models

```JS
var Song = Backbone.Model.extend({
    idAttribute: “songId”,
    urlRoot: “/api/songs”,
    defaults: {
        downloads: 0
    },
    validate: function(attrs){
        if (!attrs.title)
        return “Title is required.”;
    }
});
var song = new Song({ songId: 1, title: “Blue in Green” });
```

### Working with the Attributes

```JS
song.set(“genre”, “Jazz”);
var genre = song.get(“genre”);
song.unset(“genre”);
var hasGenre = song.has(“genre”);
song.clear();
```

### Validation

```JS
var isValid = song.isValid();
var lastError = song.validationError;
```

### Syncing with the Server

```JS
song.fetch({
    success: function(){…},
    error: function(){…}
});
song.save({}, {
    success: function(){…},
    error: function(){…}
});
song.destroy({
    success: function(){…},
    error: function(){…}
});
```

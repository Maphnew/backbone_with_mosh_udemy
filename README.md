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

## Backbone Models Project

- Create a Backbone model for a Vehicle. A Vehicle is uniquely identified via one of its
  attributes called “registrationNumber”, which cannot be null or undefined.

- Vehicles can be retrieved from the server at “/api/vehicles”.

- A Vehicle should have a method called start(), which logs a message in the console:
  “Vehicle started.”

```JS
var Vehicle = Backbone.Model.extend({
    idAttribute:"registrationNumber",
    urlRoot: "/api/vehicles",
    start: function() {
        console.log("Vehicle started")
    },
    validate: function(attrs) {
        if(!attrs.registrationNumber)
        return "Registration Number is required."
    }

})
```

- Derive a Backbone model from the Vehicle and call it Car.
  Override the start() method of the Vehicle inside the Car and log a message as: “Car
  with registration number {registrationNumber} started.”, where {registrationNumber}
  should be the value of the registrationNumber attribute.

```JS

var Car = Vehicle.extend({
    // idAttribute: Vehicle.prototype.idAttribute,
    start: function() {
        Vehicle.prototype.start.apply(this);
        const regiNumber = this.get("registrationNumber")

        console.log(`Car with registration number ${regiNumber} started.`)
    }
});
```

- Create an instance of the Car and initialise it with the following attributes:
  • registrationNumber: XLI887
  • color: Blue

```JS
var benz = new Car({
    registrationNumber: "XLI887",
    color: "Blue"
});
```

- Remove the registrationNumber attribute of the car object.

```JS
benz.unset("registrationNumber")
```

- Ask the car if it’s valid, and if not, log the validation error in the console.

```JS
var isValid = benz.isValid();
var isError = benz.validationError;

console.log(isValid, isError);
```

- Set the registrationNumber to XLI887 again. Ask the car if it’s valid and log the result in
  the console.

```JS
benz.set("registrationNumber", "XLI887");

var isValidNow = benz.isValid();
var isErrorNow = benz.validationError;
console.log(isValidNow, isErrorNow);
```

- Start the car

```JS
benz.start();
```

## Section 5: Views

### Creating Views

```JS
var SongView = Backbone.View.extend({
    tagName: "span",
    className: "song",
    id: "1",
    attributes: {
        "data-genre": "jazz"
    },
    render: function() {
        this.$el.html("Hello World");
        return this;
    }
})
// var songView = new SongView({ el: "#container" });
var songView = new SongView();
// songView.render();

$("#container").html(songView.render().$el);

```

### Views from Model data

```JS
var Song = Backbone.Model.extend();

var SongView = Backbone.View.extend({
    render: function() {
        this.$el.html(this.model.get("title"))
        return this;
    }
});

var song = new Song({ title: "Blue in Green" });

var songView = new SongView({ el: "#container", model: song });
songView.render();
```

### Views from Collection data

```html
<ul id="songs"></ul>
```

```JS
var Song = Backbone.Model.extend();
var Songs = Backbone.Collection.extend({
    model: Song
});
var SongView = Backbone.View.extend({
    tagName: "li",
    render: function() {
        this.$el.html(this.model.get("title"))
        return this;
    }
});

var SongsView = Backbone.View.extend({
    render: function() {
        var self = this;
        this.model.each(function(song){
            var songView = new SongView({ model: song });
            self.$el.append(songView.render().$el);
        });
    }
});

// var song = new Song({ title: "Blue in Green" });
var songs = new Songs([
    new Song({ title: "Blue in Green" }),
    new Song({ title: "So What" }),
    new Song({ title: "All Dead" })
]);

// var songView = new SongView({ el: "#container", model: song });
// songView.render();

var songsView = new SongsView({ el: "#songs", model: songs });
songsView.render();
```

### 27. Handling DOM Events

- Simple listening event click

```JS
var Song = Backbone.Model.extend();
var SongView = Backbone.View.extend({
    events: {
        "click": "onClick"
    },
    onClick: function() {
        console.log("Listen Click")
    },
    render: function() {
        this.$el.html(this.model.get("title") + " <button>Listen</button>");
        return this;
    }
});

var song = new Song({ title: "Blue in Green" });

var songView = new SongView({ el: "#container", model: song });
songView.render();


```

- Click by class and stopping propagation

```JS
var Song = Backbone.Model.extend();
var SongView = Backbone.View.extend({
    events: {
        "click": "onClick",
        "click .bookmark": "onClickBookmark"
    },
    onClick: function() {
        console.log("Listen Click")
    },
    onClickBookmark: function(e){
        e.stopPropagation()
        console.log("Click Bookmark")
    },
    render: function() {
        this.$el.html(this.model.get("title") + " <button>Listen</button> <button class='bookmark'>Bookmark</button>");
        return this;
    }
});

var song = new Song({ title: "Blue in Green" });

var songView = new SongView({ el: "#container", model: song });
songView.render();
```

### 28. Handling Model events

- Polling
- Pushing

```JS
var Song = Backbone.Model.extend({
    defaults: {
        listeners: 0
    }
});
var SongView = Backbone.View.extend({
    initialize: function() {
        this.model.on("change", this.render, this)
        // can be another one
        // this.model.on("change", this.onChange, this)
    },
    onChange: function() {
        this.$el.addClass("someClass)
    },
    render: function() {
        this.$el.html(this.model.get("title") + " - Listeners: " + this.model.get("listeners"));
        return this;
    }
});

var song = new Song({ title: "Blue in Green" });

var songView = new SongView({ el: "#container", model: song });
songView.render();


```

### 29. Handling Collection Events

- Add & Remove

```JS
var Song = Backbone.Model.extend();
var Songs = Backbone.Collection.extend({
    model: Song
});
var SongView = Backbone.View.extend({
    tagName: "li",
    render: function() {
        this.$el.html(this.model.get("title"));
        this.$el.attr("id", this.model.id);
        return this;
    }
});

var SongsView = Backbone.View.extend({
    tagName: "ul",
    initialize: function(){
        this.model.on("add", this.onSongAdded, this)
        this.model.on("remove", this.onSongRemoved, this)
    },
    onSongAdded: function(song) {
        var songView = new SongView({ model: song });
        this.$el.append(songView.render().$el);
    },
    onSongRemoved: function(song) {
        // this.$el.find("li#" + song.id).remove();
        this.$("li#" + song.id).remove();
    },
    render: function() {
        var self = this;
        this.model.each(function(song){
            var songView = new SongView({ model: song });
            self.$el.append(songView.render().$el);
        });
    }
});

// var song = new Song({ title: "Blue in Green" });
var songs = new Songs([
    new Song({ id: 1, title: "Blue in Green" }),
    new Song({ id: 2, title: "So What" }),
    new Song({ id: 3, title: "All Dead" })
]);

// var songView = new SongView({ el: "#container", model: song });
// songView.render();

var songsView = new SongsView({ el: "#songs", model: songs });
songsView.render();
```

### 30. Template

- html

```HTML
<script id="songTemplate" type="text/html">
            <%= title %>
            <button>Listen</button>
            <% if (plays > 1000) { %>
                <span class="popular">Popular</span>
            <% } %>
        </script>
```

- JS

```JS
var Song = Backbone.Model.extend();
var SongView = Backbone.View.extend({
    render: function() {
        var template = _.template($("#songTemplate").html());
        var html = template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});

var song = new Song({ title: "Blue in Green", plays: 1110 });

var songView = new SongView({ el: "#container", model: song });
songView.render();
```

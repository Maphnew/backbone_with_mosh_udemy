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

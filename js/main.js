
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

var Car = Vehicle.extend({
    // idAttribute: Vehicle.prototype.idAttribute,
    start: function() {
        Vehicle.prototype.start.apply(this);
        const regiNumber = this.get("registrationNumber")
        
        console.log(`Car with registration number ${regiNumber} started.`)
    }
});


var car = new Car({ registrationNumber: "ABC" });
car.get("registationNumber")
car.start()

var benz = new Car({
    registrationNumber: "XLI887",
    color: "Blue"
});
console.log(benz);
benz.unset("registrationNumber")
console.log(benz);
var isValid = benz.isValid();
var isError = benz.validationError;

console.log(isValid, isError);

benz.set("registrationNumber", "XLI887");

var isValidNow = benz.isValid();
var isErrorNow = benz.validationError;
console.log(isValidNow, isErrorNow);
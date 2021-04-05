var person = {
    name: "Mosh",

    walk: function(){
        this.trigger("walking", {
            speed:1,
            startTime: "08:00"
        });
    }
};

_.extend(person, Backbone.Events);

// person.once(...)
person.on("walking", function(e){
    console.log("Person is walking.", e);
});

person.walk();
person.off("walking");
person.walk();
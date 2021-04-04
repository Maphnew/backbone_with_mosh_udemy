var Vehicle = Backbone.Model.extend();
var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});
var VehicleView = Backbone.View.extend({
    tagName: "li",
    className: "vehicle",
    events: {
        "click .deleteVehicle": "onVehicleDelete"
    },
    onVehicleDelete: function(vehicle) {
        this.remove();
    },
    render: function() {
        this.$el.html(this.model.get("registrationNumber") + "<button class='deleteVehicle'>Delete</button>")
        return this;
    }
});

var VehiclesView = Backbone.View.extend({
    tagName: "ul",
    render: function() {
        var self = this;
        this.model.each(function(vehicle){
            var vehicleView = new VehicleView({ model: vehicle });
            self.$el.append(vehicleView.render().$el);
        });
    }
});


var vehicles = new Vehicles([
    new Vehicle({ registrationNumber: "ABC123", "data-color": "red" }),
    new Vehicle({ registrationNumber: "ZBV510", "data-color": "green" }),
    new Vehicle({ registrationNumber: "CBC111", "data-color": "orange" })
]);

var vehiclesView = new VehiclesView({ el: "#vehicles", model: vehicles });

vehiclesView.render();
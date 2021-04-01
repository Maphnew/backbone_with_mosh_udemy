console.log("Collections!")

var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
    model: Song
});

var songs = new Songs([
    new Song({ title: "Song 1" }),
    new Song({ title: "Song 2" }),
    new Song({ title: "Song 3" })
]);

songs.add({ title: "Song 4" })

var firstSong = songs.at(0);

var songWithCid = songs.get("c4");

songs.remove(firstSong);

songs.add(new Song({ genre: "jazz", title: "Song 5", downloads: 110 }), { at: 0 });
songs.push(new Song({ genre: "jazz", title: "Song 6", downloads: 90 }));

var lastSong = songs.pop();
var jazzSongs = songs.where({ genre: "jazz" });
var firstJazzSong = songs.findWhere({ genre: "jazz" });
var topDownloads = songs.filter(song => {
    return song.get("downloads") > 100;
});
songs.each(song => {
    console.log(song)
})
console.log(lastSong, jazzSongs, firstJazzSong, topDownloads);


console.clear();

var Vehicle = Backbone.Model.extend();

var Vehicles = Backbone.Collection.extend({
    model: Vehicle
});

var vehicles = new Vehicles([
    new Vehicle({ registrationNumber: "XLI887", colour: "Blue" }),
    new Vehicle({ registrationNumber: "ZNP123", colour: "Blue" }),
    new Vehicle({ registrationNumber: "XUV456", colour: "Gray"})
])

const blueCars = vehicles.where({ colour: "Blue" });
console.log(blueCars);

const XLI887 = vehicles.where({ registrationNumber: "XLI887" });
console.log(XLI887);

vehicles.remove(XLI887);

var jsonVehicles = vehicles.forEach(element => {
    const jsn = JSON.parse(JSON.stringify(element))
    console.log(jsn)
});

vehicles.each(vehicle => {
    console.log(vehicle)
})

console.log("Vehicles as JSON", vehicles.toJSON());
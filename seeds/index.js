const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:")); //showing error if there is any error while connecting database
db.once("open", () => {
    console.log("Database Connected") //showing successess message if database connected successfully
})


const sample = array => array[Math.floor(Math.random() * array.length)]; //getting a random element from an array

noOfCities = cities.length
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCitie = Math.floor(Math.random() * noOfCities);
        // console.log(cities[randomCitie].City)
        await new Campground({
            location: `${cities[randomCitie].City}, ${cities[randomCitie].State}`,
            title: `${sample(descriptors)} ${sample(places)}`
        }).save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

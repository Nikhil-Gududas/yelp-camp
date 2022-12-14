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
    for (let i = 0; i < 100; i++) {
        const randomCitie = Math.floor(Math.random() * noOfCities);
        const price = Math.floor(Math.random() * 2000) + 200;
        // console.log(cities[randomCitie].City)
        await new Campground({
            author: "63064a99388483ca19ecdbaa",
            location: `${cities[randomCitie].City}, ${cities[randomCitie].State}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dtvlxdd2u/image/upload/v1663235862/YelpCamp/eszv5cqlltfbmd5dm44x.jpg',
                    filename: 'YelpCamp/eszv5cqlltfbmd5dm44x',
                },
                {
                    url: 'https://res.cloudinary.com/dtvlxdd2u/image/upload/v1663246847/YelpCamp/l46ev6cxnwxonrjvlp5u.jpg',
                    filename: 'YelpCamp/l46ev6cxnwxonrjvlp5u',
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [cities[randomCitie].Longitude, cities[randomCitie].Latitude]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, eligendi saepe minima neque dignissimos non unde delectus fuga iusto? Non harum nostrum cupiditate quidem vitae deleniti, voluptatibus atque neque! Similique.',
            price: price,
        }).save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

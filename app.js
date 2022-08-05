const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground');

//connectin the mongodb database using mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:")); //showing error if there is any error while connecting database
db.once("open", () => {
    console.log("Database Connected") //showing successess message if database connected successfully
})

app.set('view engine', 'ejs'); //setting ejs as view engine
app.set('views', path.join(__dirname, 'views'));  //setting the path of view folder

//home route
app.get('/', (req, res) => {
    res.render('home');
})

//index route for showing all campgrounds
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index');
})



app.listen(3000, () => {
    console.log("Listening at port 3000");
})


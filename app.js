const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const User = require('./models/user');


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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs'); //setting ejs as view engine
app.set('views', path.join(__dirname, 'views'));  //setting the path of view folder

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const sessionconfig = {
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionconfig));
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//home route
app.get('/', (req, res) => {
    res.render('home');
})
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    console.log(err)
    res.status(statusCode).render('error', { err });
})


app.listen(3000, () => {
    console.log("Listening at port 3000");
})


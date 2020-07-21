const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const { format } = require('timeago.js');

//inicializaciones

const app = express();
require('./config/passport');

//static files
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname+ '/public/uploads')));
app.use('/static', express.static(path.join(__dirname, '/public')));
//app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/public/uploads/', express.static(__dirname + '/public'));
//app.use('/public/uploads', express.static('/public/uploads/'));
//app.use(express.static(path.join(__dirname + 'public')));


console.log(__dirname);
console.log(path.join(__dirname, 'public'));


//settings

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars : allowInsecurePrototypeAccess(Handlebars),

}));
Handlebars.registerHelper('timeago', function(Date) { 
  return format.date()
});
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
app.use(multer({storage}).single('image')); //imput de tipo file parametro image

app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  app.locals.format = format;

  next();
});


//routes

app.use(require('./routes/index.routes'));
app.use(require('./routes/products.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/contact'));

app.get('/', (req,res) => {
  res.render('index');
});


module.exports = app;

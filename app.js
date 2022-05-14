const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const { homeRouter } = require('./routers/homeRouter');
const authRoutes = require('./routers/authRoutes');
const { client } = require('./utils/db/db');
const { urlencoded } = require('express');
const { loggedRouter } = require('./routers/loggedRoutes');
const { unsignedRouter } = require('./routers/unsignedRouter');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// database connection and app start
client
	.connect()
	.then((result) =>
		app.listen(3000, 'localhost', () => {
			console.log('App started: http://asrlicznik.ct8.pl');
		})
	)
	.catch((error) => console.error('Error connecting to the database'));

//handlebars
app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		helpers: {
			getYear: function (date) {
				return date.getFullYear().toString();
			},
		},
	})
);
app.set('view engine', '.hbs');

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//routes
app.use('/', homeRouter);
app.use('/unsigned', unsignedRouter);
app.use('/logged', loggedRouter);
app.use(authRoutes);

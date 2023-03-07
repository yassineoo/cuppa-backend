import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import session from 'express-session';
// Create express instance to setup API
//import ExpressLoader from  './loaders/Express' ;
//new ExpressLoader();




dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000 * 60 * 24,
	},
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req: Request, res: Response) => {

	res.send('Application works!');

});


app.listen(PORT, () => {
  
	console.log(`Application started on this port ${PORT}!`);

});





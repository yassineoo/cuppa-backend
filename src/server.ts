import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import distributorRoute from './routes/ditributor';

dotenv.config();
const URL = process.env.URL;
const PORT = process.env.PORT || 5000;
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
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.use('/dst',distributorRoute);


app.listen(PORT, () => {  
  console.log(`Application started on this port ${PORT}!`);
});


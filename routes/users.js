import express from 'express';

import {
     getEvents,
     createEvent,
     updateEvent,
     deleteEvent,
} from '../controllers/events.js';
import auth from '../middelware/auth.js';
const route = express.Router();

route.get('/:id', getEvents); // placeid
route.post('/:id', createEvent); //placeid
route.patch('/:id/:id', auth, updateEvent); // placeid/eventid
route.delete('/:id/:id', auth, deleteEvent); // placeid/eventid
export default route;

import bodyParser from 'body-parser' ;
import express from 'express' ;
import morgan from 'morgan' ;
import path from 'path' ;
import routes from '../routes' ;
//import compression from 'compression' ;
//import logger from '../services/Logger' ;
import config from '../config' ;
import session from 'express-session';

class ExpressLoader {

	private server :any;

	constructor () {

		const app = express();

		// Setup error handling, this must be after all other middleware
		app.use( ExpressLoader.errorHandler );

		// Serve static content
		app.use( express.static( path.join( __dirname, 'uploads' ) ) );

		// Set up middleware
		app.use( morgan( 'dev' ) );
		//app.use( compression() );
		app.use( bodyParser.urlencoded( {
			extended: false,
			limit: '20mb'
		} ) );
		app.use( bodyParser.json( { limit: '20mb' } ) );
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

		// Pass app to routes
		routes( app );


		// Start application
		this.server = app.listen( config.port, () => {

			logger.info( `Express running, now listening on port ${config.port}` );
		
		} );
	
	}

	get Server () {

		return this.server;
	
	}

	/**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
	static errorHandler ( error, req, res, next ) {

		let parsedError;

		// Attempt to gracefully parse error object
		try {

			if ( error && typeof error === 'object' ) {

				parsedError = JSON.stringify( error );
			
			} else {

				parsedError = error;
			
			}
		
		} catch ( e ) {

			logger.error( e );
		
		}

		// Log the original error
		logger.error( parsedError );

		// If response is already sent, don't attempt to respond to client
		if ( res.headersSent ) {

			return next( error );
		
		}

		res.status( 400 ).json( {
			success: false,
			error
		} );
	
	}

}

export default ExpressLoader;
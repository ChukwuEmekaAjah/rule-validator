const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const ValidationService = require('./service');

app.use(express.json());
app.disable('etag').disable('x-powered-by');


app.use(function(err, req, res, next){
	// invalid json data
	if(err){
		return res.status(400).send({
			errors:[{
				reason: 'Invalid data sent. Expected a valid JSON data',
				field: null,
				code: '4xx',
			}]
		})
	}
	
	return next();
})

exports.getApplication = function getApplication () {
	app.use(morgan('combined'));
	app.use(helmet())
	
	app.get('/', function(req, res){
		const {status, ...response} = ValidationService.GetHome();
		return res.status(status).send(response);
	});
	app.post('/validate-rule', function(req, res){
		return res.send("About to validate data")
	});

	app.use(function( req, res){
		// invalid endpoint
		return res.status(404).send({
			errors:[{
				reason: 'You have lost your way mate.',
				field: null,
				code: '4xx',
			}]
		})
	})
	
	return app;

};

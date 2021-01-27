const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const ValidationService = require('./service');
const helpers = require("./helpers");
const HTTP_CODES = helpers.HTTP_CODES;

app.use(express.json());
app.disable('etag').disable('x-powered-by');
app.use(morgan('combined'));
app.use(helmet())

app.use(function(err, req, res, next){
	// invalid json data
	if(err){
		return res.status(HTTP_CODES.BAD_REQUEST).send({
			status:"error",
			message: "Invalid JSON payload passed.",
			data: null
		})
	}
	
	return next();
})

exports.getApplication = function getApplication () {
	
	
	app.get('/', function(req, res){
		const {statusCode, ...response} = ValidationService.GetHome();
		return res.status(statusCode).send(response);
	});

	app.post('/validate-rule', function(req, res){
		const requestBody = Object.assign({}, req.body);
		const {statusCode, ...response} = ValidationService.ValidateData(requestBody)
		return res.status(statusCode).send(response);
	});

	app.use(function( req, res){
		// invalid endpoint
		return res.status(HTTP_CODES.NOT_FOUND).send({
			status:"error",
			message: "API endpoint not found.",
			data: null
		})
	})
	
	return app;

};

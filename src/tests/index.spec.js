const ValidationService = require("../service");
const HTTP_CODES = require("../helpers").HTTP_CODES;

describe('Home page should return developer details', function() {


    test("should return an object of developer details and a 200 HTTP status code", () => {
        const {statusCode, ...response} = ValidationService.GetHome();
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.data.email).toBe('talk2ajah@gmail.com');
        expect(response.status).toBe('success')
    });

});

describe('Validation should assess request body and return a result accordingly', function() {


    test("should return a 400 bad request response for invalid request body", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        
    });

    test("should return a 400 bad request response inexistent rule property", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`rule is required.`)
        
    });

    test("should return a 400 bad request response for invalid rule value", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:3});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`rule should be an object.`)
        
    });

});

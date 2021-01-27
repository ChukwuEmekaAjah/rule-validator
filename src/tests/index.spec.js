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

    test("should return a 400 bad request response for non-existent rule field", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{condition:'gte', condition_value:"meat"}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field is required.`)
        
    });

    test("should return a 400 bad request response for non-existent rule condition", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'gte', condition_value:"meat"}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`condition is required.`)
        
    });

    test("should return a 400 bad request response for non-existent rule condition_value", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'gte', condition:"gt"}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`condition_value is required.`)
        
    });

    test("should return a 400 bad request response for empty rule object", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field is required.`)
        
    });

    test("should return a 400 bad request response for absent data field", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'gte', condition:"gt", condition_value:'meat'}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`data is required.`)
        
    });

    test("should return a 400 bad request response for invalid data type", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'gte', condition:"gt", condition_value:'meat'}, data:3});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`data is invalid.`)
        
    });

});

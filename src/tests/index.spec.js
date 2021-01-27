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

    test("should return a 400 bad request response for invalid non-matching field type with data", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'name', condition:"gt", condition_value:'meat'}, data:'name'});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field name is missing from data.`)
        
    });

    test("should return a 400 bad request response for invalid non-matching field type with data", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'', condition:"gt", condition_value:'meat'}, data:{name:'name'}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(` should be a string.`)
        
    });

    test("should return a 400 bad request response for non-existent string character", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'7', condition:"gt", condition_value:'meat'}, data:'name'});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 7 is missing from data.`)
        
    });

    test("should return a 400 bad request response for non-existent array position", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'7', condition:"gt", condition_value:'meat'}, data:['name', 'age', 'people']});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 7 is missing from data.`)
        
    });

    test("should return a 400 bad request response for non-existent array object field", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0.age', condition:"gt", condition_value:'meat'}, data:[{name:''}]});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 0.age is missing from data.`)
        
    });

    test("should return a 400 bad request response for invalid condition type", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0.name', condition:"lt", condition_value:'meat'}, data:[{name:''}]});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`condition lt is invalid.`)
        
    });

    test("should return a 400 bad request response for failed validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0.name', condition:"gt", condition_value:'meat'}, data:[{name:''}]});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 0.name failed validation.`)
        
    });

    test("should return a 400 bad request response for failed validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0.name', condition:"gte", condition_value:'meet'}, data:[{name:'meat'}]});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 0.name failed validation.`)
        expect(response.data.validation.field_value).toEqual('meat')
    });

    test("should return a 400 bad request response for failed validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'2', condition:"gte", condition_value:'meet'}, data:['age', 'friends', 'meat', 'people']});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 2 failed validation.`)
        expect(response.data.validation.field_value).toEqual('meat')
    });

    test("should return a 400 bad request response for failed validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'2', condition:"eq", condition_value:'a'}, data:'greet'});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field 2 failed validation.`)
        expect(response.data.validation.field_value).toEqual('e')
    });

});

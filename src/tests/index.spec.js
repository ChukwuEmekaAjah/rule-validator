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
        expect(response.message).toEqual(`field should be a string.`)
        
    });

    test("should return a 400 bad request response for invalid condition type", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'name', condition:3, condition_value:'meat'}, data:{name:'name'}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`condition should be a string.`)
        
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

    test("should return a 400 bad request response for failed validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'person.age', condition:"eq", condition_value:32}, data:{person:{age:23}}});
        
        expect(statusCode).toEqual(HTTP_CODES.BAD_REQUEST);
        expect(response.message).toEqual(`field person.age failed validation.`)
        expect(response.data.validation.field_value).toEqual(23)
    });

});

describe('Validation of successful request bodies', function() {

    test("should return a 200 OK response for array of objects validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0.name', condition:"eq", condition_value:'meat'}, data:[{name:'meat'}]});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field 0.name successfully validated.`)
        expect(response.data.validation.field_value).toEqual('meat')
    });

    test("should return a 200 OK response for array of numbers validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'0', condition:"gte", condition_value:23}, data:[27, 28,29]});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field 0 successfully validated.`)
        expect(response.data.validation.field_value).toEqual(27)
    });

    test("should return a 200 OK response array of strings validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:2, condition:"eq", condition_value:'meat'}, data:['age', 'friends', 'meat', 'people']});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field 2 successfully validated.`)
        expect(response.data.validation.field_value).toEqual('meat')
    });

    test("should return a 200 OK response for string index validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'2', condition:"neq", condition_value:'a'}, data:'greet'});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field 2 successfully validated.`)
        expect(response.data.validation.field_value).toEqual('e')
    });

    test("should return a 200 OK response for object properties validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'person.age', condition:"eq", condition_value:32}, data:{person:{age:32}}});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field person.age successfully validated.`)
        expect(response.data.validation.field_value).toEqual(32)
    });

    test("should return a 200 OK response for object properties validation", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'person.age.dob', condition:"eq", condition_value:1996}, data:{person:{age:{dob:1996}}}});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field person.age.dob successfully validated.`)
        expect(response.data.validation.field_value).toEqual(1996)
    });

    test("should return a 200 OK response for object property that is an array", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'persons.1', condition:"eq", condition_value:'emeka'}, data:{persons:['ope', 'emeka', 'chuks']}});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field persons.1 successfully validated.`)
        expect(response.data.validation.field_value).toEqual('emeka')
    });

    test("should return a 200 OK response for object property that is an object", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'persons.1.age', condition:"eq", condition_value:32}, data:{persons:[{age:23, name:'chuks'}, {age:32, name:'emeka'}]}});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field persons.1.age successfully validated.`)
        expect(response.data.validation.field_value).toEqual(32)
    });

    test("should return a 200 OK response for a correct object property", () => {
        const {statusCode, ...response} = ValidationService.ValidateData({rule:{field:'name', condition:"contains", condition_value:"uks"}, data:{name:"Chuks"}});
        
        expect(statusCode).toEqual(HTTP_CODES.OK);
        expect(response.message).toEqual(`field name successfully validated.`)
        expect(response.data.validation.field_value).toEqual("Chuks")
    });

});

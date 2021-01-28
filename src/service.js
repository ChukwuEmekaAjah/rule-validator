const helpers = require("./helpers");
const HttpResponse = helpers.HttpResponse;
const HTTP_CODES = helpers.HTTP_CODES;
function ValidationService(){
    function GetHome(){
        const data = {
            "message": "My Rule-Validation API",
            "status": "success",
            "data": {
              "name": "Chukwuemeka Ajah",
              "github": "@chukwuemekaajah",
              "email": "talk2ajah@gmail.com",
              "mobile": "09034017159",
              "twitter": "@ajahso4"
            }
        }

        return HttpResponse.GoodResponse(HTTP_CODES.OK, data, "Successfully retrieved developer details");
    }
    function isValidCondition(condition){
        const conditions = {
            "gte": true,
            "eq": true,
            "neq": true,
            "gt": true,
            "contains": true,
        }

        return conditions[condition] ? true : false;
    }

    function validateRule(data, conditionValue, condition){
        const conditions = {
            "gte": data >= conditionValue,
            "eq": data === conditionValue,
            "neq": data !== conditionValue,
            "gt": data > conditionValue,
        }

        if(typeof(data) == 'string' || Array.isArray(data)){
            conditions.contains = data.indexOf(conditionValue) > -1 ? true : false
        } else if(typeof(data) == 'object'){
            conditions.contains = data.hasOwnProperty(conditionValue);
        } else{
            conditions.contains = false;
        }

        return conditions[condition]
    }

    function ValidateData(data){
        if(data.hasOwnProperty('rule') === false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`rule is required.`, data:null, status:'error'})
        }

        if(Boolean(data.rule) == false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`rule should be an object.`, data:null, status:'error'})
        }

        if(typeof(data.rule) !== 'object' || Object.getPrototypeOf(data.rule).toString() !== "[object Object]"){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`rule should be an object.`, data:null, status:'error'})
        }

        // check for the compulsory fields in rule object
        const ruleFields = ['field', 'condition', 'condition_value'];
        for(let field of ruleFields){
            if(data.rule.hasOwnProperty(field) === false){
                return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`${field} is required.`, data:null, status:'error'})
            }
        }

        // data field is required
        if(data.hasOwnProperty('data') === false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`data is required.`, data:null, status:'error'})
        }

        let typeOfData = null;

        if(typeof(data.data) == 'string'){
            typeOfData = 'string';
        } else if(typeof(data.data) == 'object'){
            if(data.data === null){
                typeOfData = null;
            }else if(Array.isArray(data.data)){
                typeOfData = 'array';
            }else{
                typeOfData = 'object';
            }
        }

        if(Boolean(typeOfData) == false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`data is invalid.`, data:null, status:'error'})
        }

        // create an array of properties e.g person.age -> ['person', 'age'], age -> [age], 2 -> [2], person.0 -> [person, 0]
        let parsedFieldValue = (typeof(data.rule.field) == 'string' && Boolean(data.rule.field)) ? data.rule.field.split('.') : typeof(data.rule.field) == 'number' ? [data.rule.field] : null;
        
        if(Boolean(parsedFieldValue) == false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`${data.rule.field} should be ${typeOfData !== 'object' ? 'an' : 'a'} ${typeOfData !== 'object' ? 'integer' : 'string'}.`, data:null, status:'error'})
        }

        const fieldValue = helpers.findFieldValue(data.data, parsedFieldValue);

        if(fieldValue === undefined){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`field ${data.rule.field} is missing from data.`, data:null, status:'error'})
        }

        if(!isValidCondition(data.rule.condition)){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`condition ${data.rule.condition} is invalid.`, data:null, status:'error'})
        }

        if(!validateRule(fieldValue, data.rule.condition_value, data.rule.condition)){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`field ${data.rule.field} failed validation.`, status:'error', data:{validation:{error:true, field:data.rule.field, field_value: fieldValue, condition: data.rule.condition, condition_value:data.rule.condition_value}}})
        }

        return HttpResponse.GoodResponse(HTTP_CODES.OK, {message: `field ${data.rule.field} successfully validated.`, status:"success", data:{validation:{error:false, field:data.rule.field, field_value:fieldValue, condition: data.rule.condition, condition_value:data.rule.condition_value}}})
    }

    return {
        GetHome,
        ValidateData,
    }
}

module.exports = ValidationService();
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

    function ValidateData(data){
        if(data.hasOwnProperty('rule') === false){
            return HttpResponse.BadResponse(HTTP_CODES.BAD_REQUEST, {message:`rule is required.`, data:null, status:'error'})
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
    }

    return {
        GetHome,
        ValidateData,
    }
}

module.exports = ValidationService();
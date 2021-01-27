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
        
    }

    return {
        GetHome,
        ValidateData,
    }
}

module.exports = ValidationService();
function logMessage(message){
    console.log(message)
}

function HTTP_CODES(){
    return {
        'CREATED': 201,
        'OK': 200,
        'BAD_REQUEST': 400,
        'UNAUTHORIZED': 401,
        'FORBIDDEN': 403,
        'NOT_FOUND': 404,
        'UNAVAILABLE': 451,
        'TOO_MANY': 429,
        'EXPECTATION_FAILED': 417,
        'SERVER_ERROR': 500,
    }
}
function HttpResponse(){
    function GoodResponse(statusCode, data, message){
        logMessage(message);
        return {
            status: statusCode,
            data: data,
        }
    }

    function BadResponse(statusCode, data, message){
        logMessage(message);
        return {
            status: statusCode,
            data: data,
        }
    }

    return {
        BadResponse,
        GoodResponse,
    }
}

module.exports = {
    HttpResponse: HttpResponse(),
    HTTP_CODES: HTTP_CODES(),
    logMessage,
}
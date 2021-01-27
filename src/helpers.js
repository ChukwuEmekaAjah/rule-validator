function logMessage(message){
    console.log(message)
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
    HttpResponse,
    logMessage,
}
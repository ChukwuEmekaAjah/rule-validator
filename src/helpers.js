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
        //logMessage(message);
        return {
            statusCode: statusCode,
            ...data,
        }
    }

    function BadResponse(statusCode, data, message){
        //logMessage(message);
        return {
            statusCode: statusCode,
            ...data,
        }
    }

    return {
        BadResponse,
        GoodResponse,
    }
}

function findFieldValue(data, fields){
    let object = data;
    
    for(let field of fields){
        if(Boolean(object) == false){
            return undefined;
        }

        if(typeof(object) == 'string'){
            object = object[Number(field)];
            continue;
        }
        if(Array.isArray(object)){
            object = object[Number(field)];
            continue;
        }
        
        object = object[field];

        
    }
    
    return object;
}

module.exports = {
    HttpResponse: HttpResponse(),
    HTTP_CODES: HTTP_CODES(),
    logMessage,
    findFieldValue,
}
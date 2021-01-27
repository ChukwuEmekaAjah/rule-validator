const {getApplication} = require('./application');
const app = getApplication();

const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

const start = async function(){
    try{
        server.listen(port);
        server.on('listening', function(){
            console.log(`Server has started on port ${port}`)
        })
        server.on("error", handleError);
    } catch(err){
        console.error(error);
        process.exit(1);
    }
}

function handleError(error){
    if(error.code == 'EACCES'){
        process.exit(1);
    } else if(error.code == 'EADDRINUSE'){
        console.error(`Port address: ${port} is already in use`);
        process.exit(1);
    }else{
        console.log(error);
        process.exit(1);
    }
}

start();
//Middleware para capturar cualquier error
//Este se podría usar para agregarlo a un sistema de trackings de errores
function logErrors (err, req, res, next){
  console.error(err);
  next(err);
}

//Detectar un error y crea un formato para devolverlo al cliente
function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

//Este majerará los errores de BOOM
function boomErrorHandler(err, req, res, next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }else{
    //este es necesario para evitar el error:
    //"Cannot set headers after they are sent to the client"
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }

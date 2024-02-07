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

module.exports = { logErrors, errorHandler }

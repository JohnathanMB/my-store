const boom = require('@hapi/boom')

//Vamos a crear middlewares de forma dinámica.
//Leer más sobre Closures en Javascript
function validatorHandler (schema, property){
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

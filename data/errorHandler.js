function errorHandler(error) {
  console.dir(error);
  throw new Error('Fallo en la operacion del servidor');
}

module.exports = errorHandler;

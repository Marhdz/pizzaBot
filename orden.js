const fs = require('fs');

var fetchOrder = (id) => {
  try {
    var ordenString = fs.readFileSync('./SessionId/'+id);
    return JSON.parse(ordenString);
  } catch (e) {
    return [];
  }
};

var guardarOrden = (id,orden) => {
  fs.writeFileSync('./SessionId/'+id, JSON.stringify(orden));
};

var agregarOrden = (id,compra) => {
  var orden = fetchOrder(id);
  var ordenActual = {
    compra
  };
    console.log(orden);
    orden.push(ordenActual);
    console.log(orden);
    guardarOrden(id,orden);
  //  return ordenActual;
};

var leerOrden = (id) => {
  var orden = fetchOrder(id);
  return orden;
};

//var borrarOrden = (id)

module.exports = {
  agregarOrden,
  leerOrden
};

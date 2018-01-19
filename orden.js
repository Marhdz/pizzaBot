const fs = require('fs');


var fetchOrder = (id) => {
  try {
    var ordenString = fs.readFileSync('./SessionId/Id');
    return JSON.parse(ordenString);
  } catch (e) {
    return [];
  }
};

var guardarOrden = (id,orden) => {
  fs.writeFileSync('./SessionId/Id', JSON.stringify(orden));
};

var agregarOrden = (id,compra) => {
  var orden = fetchOrder(id);
  var ordenActual = {
    id,
    compra
  };
    orden.push(ordenActual);
    guardarOrden(id,orden);
};

var leerOrden = (id) => {
  var orden = fetchOrder(id);
  var ordenId = orden.filter((id)=>{
     orden.id=id
   });
  return orden;
};

//var borrarOrden = (id)


module.exports = {
  agregarOrden,
  leerOrden
};

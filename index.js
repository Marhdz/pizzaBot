const express   = require('express');
const bodyParser= require('body-parser');
//const request = require('request-promise');
const fs = require('fs');

const orden=require('./orden.js')

const server = express();
server.use(bodyParser.urlencoded({
   extended: true
}));

server.use(bodyParser.json());

server.post('/lista-orden', function (req, res) {
    var compra=req.body.result && req.body.result.parameters && req.body.result.parameters.Compra;
    let id=req.body.sessionId;
    console.log(id);
    var action=req.body.result.action;
    var pedido=[];

    if(action==='AgregarCompra'){
      var addOrden=orden.agregarOrden(id,compra);
      return  res.json({
              speech: "",
              messages: [
                {
                  type: 0,
                  platform: "facebook",
                  speech: "Excelente! Tu orden ha sido añadida a la compra"
                },
                {
                  type: 2,
                  platform: "facebook",
                  title: "Qué deseas hacer? ",
                  replies: [
                    'Ver compra',
                    'Volver al menú',
                    'Finalizar compra'
                  ]
                }
              ]
              // speech: 'Excelente! tu orden ha sido añadida '+id,
              // displayText: 'Excelente! tu orden ha sido añadida '+id,
              // source: 'first-webhook'
            });
    };

    if(action==='VerCompra'){
      var lista=orden.leerOrden(id);
      console.log(lista);
      listaPedidos= lista.map((x)=>{
        return {
          type:0,
          platform: 'facebook',
          speech:x.compra}
      })
    return  res.json({
        speech: '',
        messages: listaPedidos,
        source: 'first-webhook'
      });

      //return listaPedidos;

    };

    if (action==='EliminarOrden'){
      var nuevaOrden=orden.borrarCompra(id,compra);
      return  res.json({
              speech: "",
              messages: [
                {
                  type: 0,
                  platform: "facebook",
                  speech: "La orden ha sido eliminada de la compra"
                },
                {
                  type: 2,
                  platform: "facebook",
                  title: "Qué deseas hacer? ",
                  replies: [
                    'Ver compra',
                    'Volver al menú',
                    'Finalizar compra'
                  ]
                }
              ]
            });
    };

    if (action==='FinalizarCompra'){
      var nuevaOrden=orden.borrarTodo(id);
      return  res.json({
              speech: "",
              messages: [
                {
                  type: 0,
                  platform: "facebook",
                  speech: "Perfecto! Tu orden va en camino..."
                }
              ]
            });
    };
});

server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and running...");
});

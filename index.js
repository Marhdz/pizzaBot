const express   = require('express');
const bodyParser= require('body-parser');
const request   = require('request');
const fs = require('fs');

const orden=require('./orden.js')

const server = express();
server.use(bodyParser.urlencoded({
   extended: true
}));

server.use(bodyParser.json());

server.post('/lista-orden', function (req, res) {
    var compra=req.body.result && req.body.result.parameters && req.body.result.parameters.Compra;
    var id=req.body.sessionId;
    var action=req.body.result.action;
    var pedido=[];

    if(action==='AgregarCompra'){
      var addOrden=orden.agregarOrden(id,compra);
      return  res.json({
                      speech: 'Se ha agregado '+ compra,
                      displayText: 'Se ha agregado '+ compra,
                      source: 'first-webhook'
                  });
    };

    if(action==='VerCompra'){
      var lista=orden.leerOrden(id);
      listaPedidos= lista.map((x)=>{
        return {
          type:0,
          speech:x.compra}
      })
console.log(listaPedidos);
      res.json({
        speech: '',
        messages: listaPedidos,
        source: 'first-webhook'
      });
      return listaPedidos;
    };
});

server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and running...");
});

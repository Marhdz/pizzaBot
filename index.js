const express   = require('express');
const bodyParser= require('body-parser');
//const http      = require('http');
//const https     = require('https');
const request   = require('request');

const server = express();
server.use(bodyParser.urlencoded({
   extended: true
}));

server.use(bodyParser.json());

server.post('/lista-orden', function (req, res) {
    var action=req.body.result.action;
    var pedido=[];
    if(action==='AgregarCompra'){
      let compra=req.body.result && req.body.result.parameters && req.body.result.parameters.Compra;
      pedido.push(compra);
      return  res.json({
                      speech: pedido,
                      displayText: pedido,
                      source: 'first-webhook'
                  });
    };

    if(action==='VerCompra'){
      return res.json({
                      speech: pedido,
                      displayText: pedido,
                      source: 'first-webhook'
                  });
    };
});

server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and running...");
});

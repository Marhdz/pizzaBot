
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./server/db/mongoose');
var {Orden} = require('./server/models/orden');
var productos = require('./server/models/productos.json');

//var app = express();
//const port = process.env.PORT || 3000;

//app.use(bodyParser.json());
//******************************************************
const server = express();
server.use(bodyParser.urlencoded({
   extended: true
}));

server.use(bodyParser.json());

server.post('/lista-orden', function (req, res) {
    var action=req.body.result.action;
    var Id=req.body.sessionId;
    // var pedido=[];
    var orden = new Orden({
      UserId: req.body.sessionId,
      producto: req.body.result.parameters.Compra,
       // precio:
       // confirmado:
       // enviado:
    });

      if(action==='AgregarCompra'){

          orden.save().then((doc) => {
            res.send(doc);
          }, (e) => {
            res.status(400).send(e);
          });

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
      Orden.find({'confirmado':false,'UserId':Id},function(e,docs){
        listaPedidos= docs.map((x)=>{
          var nombre=x.producto;
            return {
              type:1,
              platform: 'facebook',
              title :nombre+' ($'+productos[nombre].precio+')',
              subtitle: productos[nombre].descripcion,
              imageUrl: productos[nombre].url,
              buttons:[{
                text: 'Borrar '+x.producto,
                postback:''
              }]
            }
        });

        var listaPrecios=docs.map((x)=>{
          precios=parseFloat(productos[x.producto].precio);
          return precios
        });
        var total=0;
        for(var i in listaPrecios) { total += listaPrecios[i];}


        listaPedidos.push({
          type: 0,
          platform: "facebook",
          speech: "Total: $"+total},
          {
            type: 2,
            platform: "facebook",
            title: "Qué deseas hacer? ",
            replies: [
              'Volver al menú',
              'Finalizar compra'
            ]
          });
      return  res.json({
          speech: '',
          messages: listaPedidos
        });

      }, (e) => {
        res.status(400).send(e);
      });
    };

    if (action==='Borrar'){
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
module.exports = {server};

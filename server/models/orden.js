var mongoose = require('mongoose');

var Orden = mongoose.model('Orden', {
  UserId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  producto:{
    type: String,
    required:true
  },
  precio:{
    type: Number
  },
  confirmado: {
    type: Boolean,
    default: false
  }
});

module.exports = {Orden};

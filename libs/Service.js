var async           = require("async");
var request         = require("request");
var logger          = require("node-wrapper/logger");

var Backend           = require("./Backend");


var Service = function (data) {
  var self          = this;
  
  this.config       = data.config;
  this.name         = data.name;
  this.port         = data.port;
  this.log          = logger.create("Service:" + this.name + ":" + this.port);
  this.backends     = data.backends;
  
  this.start = function (data, callback) {
    self.log._info("Start");
    
    for (var i = 0; i < self.backends.length; i++) {
      self.backends[i].port = self.port;
      
      var data = self.backends[i];
      data.port = self.port;
      self.backends[i] = new Backend(data);
    }
    
    setInterval(function (data) {
      self.log._info("ping");
      
      async.map(self.backends, function (backend, callback) {
        backend.check({}, callback);
      }, function (err, results) {
        self.log._info("Results");
        console.log(results);
      });
      
      return ;
    }, self.config.check.interval);
    
    return callback();
  }
};


module.exports = Service;
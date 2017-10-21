var async             = require("async");
var logger            = require("node-wrapper/logger");

var Probe             = require("./Probe");

var Backend = function (data) {
  var self          = this;
  var status        = "ready";
  
  this.host         = data.host;
  this.port         = data.port;
  this.weight       = data.weight;
  this.probes       = [];
  this.log          = logger.create("Backend:"+self.host+":"+self.port);
  
  this.log._debug("Instanciate Backend");
  
  // Create new probes
  for (var i = 0; i < data.probes.length; i++) {
    var pdata = { host: self.host, port: self.port};
    
    for (var key in data.probes[i]) pdata[key] = data.probes[i][key];
    
    self.probes.push(new Probe(pdata));
  }
  
  this.check = function (data, callback) {
    self.log._debug("check");
    
    async.map(self.probes, function (probe, callback) {
      probe.check({}, callback);
    }, function (error, results) {
      if (error) return callback(error);
      
      var status = true;
  
      for (var i = 0; i < results.length; i++) {
        if (results[i] == false) status = false;
      }
      return callback(null, status);
    });
  };
  
};

module.exports = Backend;
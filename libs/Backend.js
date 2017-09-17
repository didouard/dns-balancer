var async             = require("async");

var Probe             = require("./Probe");

var Backend = function (data) {
  var self = this;
  
  this.host         = data.host;
  this.port         = data.port;
  this.weight       = data.weight;
  this.probes       = [];
  
  for (var i = 0; i < data.probes; i++) {
    var pdata = { host: self.host, port: self.port};
    
    for (var key in data.probes[i]) pdata[key] = data.probes[i][key];
    
    self.probes.push = new Probe(pdata);
  }
  
  this.check = function (data, callback) {
    async.map(self.probes, function (probe, callback) {
      probe.check({}, callback);
    }, function (error, results) {
      if (error) return callback(error);
      
      var status = true;
  
      for (var i = 0; i < results; i++) {
        if (results[i] == false) status = false;
      }
      return callback(null, status);
    });
  };
  
};

module.exports = Backend;
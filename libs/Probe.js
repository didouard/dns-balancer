
var logger          = require("node-wrapper/logger");
var ping            = require("ping");

var Probe = function (data) {
  var self          = this;  

  this.type         = data.type;
  this.host         = data.host;
  this.port         = data.port;
  this.log          = logger.create("probe:"+self.host+":"+self.port);
  
  this.log._debug("New probe");

  var checkIp = function (data, callback) {
    self.log._debug("check IP"+self.host+":"+self.port);
    ping.sys.probe(self.host, function(isAlive) {
      self.log._debug("Result : " + (isAlive) ? "OK" : "KO");  
      callback(null, isAlive);
    });
  };
  
  //TODO
  var checkHttp = function (data, callback) {
     
  };
  
  switch (self.type) {
      case "ip": 
        this.check = checkIp;
        break;
      case "http":
        this.check = checkHttp; // TODO
        this.check = checkIp;
        break;
  }
};



module.exports = Probe;
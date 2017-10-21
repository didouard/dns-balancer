
var logger          = require("node-wrapper/logger");
var ping            = require("ping");

var Probe = function (data) {
  var self          = this;  

  this.type         = data.type;
  this.host         = data.host;
  this.port         = data.port;
  this.log          = logger.create("probe:"+self.type+":"+self.host+":"+self.port);
  
  this.log._debug("Instanciate probe");

  var checkIp = function (data, callback) {
    self.log._debug("Check IP");
    setTimeout(function() {
      var isAlive = false;
      self.log._debug("Result : " + (isAlive) ? "OK" : "KO");  
      callback(null, isAlive);
    }, 3000);
  };
  
  //TODO
  var checkHttp = function (data, callback) {
     
  };
  
  switch (this.type) {
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
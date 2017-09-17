
var logger          = require("node-wrapper/logger");
var ping            = require("ping");

var Probe = function (data) {
  var self          = this;  

  this.type         = data.type;
  this.host         = data.host;
  this.port         = data.port;

  switch (self.type) {
      case "ip": 
        this.check = checkIp;
        break;
      case "http":
        this.check = checkHttp; // TODO
        this.check = checkIp;
        break;
  }

  var checkIp = function (data, callback) {
    ping.sys.probe(self.host, function(isAlive){
        callback(null, isAlive);
    });
  };
  
  //TODO
  var checkHttp = function (data, callback) {
     
  };
};



module.exports = Probe;
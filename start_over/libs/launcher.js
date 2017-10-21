
var logger          = require("node-wrapper/logger");

var Service         = require("./Service.js");

var launcher = function (data, callback) {
  var log = logger.create("Service:launcher");
  for (var i = 0; i < data.config.services.length; i++) {
    log._info("Launch " + data.config.services[i].name);
    
    data.config.services[i].config = data.config;
    var service = new Service(data.config.services[i]); 
    service.start({}, function() {});
  }
};

module.exports = launcher;
var assert     = require("assert");
var crawler    = require("crawler-ninja");
var cs         = require("crawler-ninja/plugins/console-plugin");

var testSite  = require("./website/start.js").site;

describe('Redis Queue tests', function() {


        it('Test', function(done) {
          this.timeout(10000000);
          var options = {
            // Horrible only for the unit text-justify
            // In a real app, we can use the node module name
            maxConnections : 5,
            storeModuleName : "crawler-ninja-redis-store",
            queueModuleName : "../../../../index.js",
            queueParams : { port : 6379, host : '127.0.0.1'}
          };

          crawler.init(options, function(){ done();});
          var consolePlugin = new cs.Plugin();
          crawler.registerPlugin(consolePlugin);
          //crawler.queue({url : "http://localhost:9999/index.html"});
          crawler.queue({url : "http://www.rtbf.be"});

        });



});

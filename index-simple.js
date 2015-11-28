var bull = require('bull');
var cluster = require('cluster');

(function () {

  var queue = null;
  var crawUrl = null;
  var endOfCrawl = null;
  var numWorkers = 8;

  function init (options, onUrlToCrawl, endCallback) {
      crawUrl = onUrlToCrawl;
      endOfCrawl = endCallback;

      queue = bull('CrawlQueue', options.queueParams.port, options.queueParams.host);

      queue.process(function(job, callback){
            //console.log("QUEUE.process", job);
            crawUrl(job.data, callback);
      });

  }

  function push(options) {
      //console.log("QUEUE.push", options.url);
      queue.add(options);
  }

  function idle() {
      //TODO : review this code - how to detect the end of
      return false; //still have some url to crawl
      //return queue.idle();
  }

  module.exports.init = init;
  module.exports.push = push;
  module.exports.idle = idle;
  //module.exports.queue = queue;
  //module.exports.idle = idle;

}());

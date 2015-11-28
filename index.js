var Queue = require('bee-queue');

(function () {


  var crawUrl = null;
  var endOfCrawl = null;
  var numWorkers = 8;

  var queue = null;

  function init (options, onUrlToCrawl, endCallback) {
      crawUrl = onUrlToCrawl;
      endOfCrawl = endCallback;

      queue = new Queue("CrawlQueue");
      queue.process(options.maxConnections, function (job, callback) {
          crawUrl(job.data, callback);
      });

      /*
      queue.process(function(job, callback){
            //console.log("QUEUE.process", job);
            crawUrl(job.data, callback);
      });
      */


  }

  function push(options) {
      
      var job = queue.createJob(options).save();
      /*
      job.on('succeeded', function (result) {
        console.log('End of Job :  ' + job.id );
      });
      */

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

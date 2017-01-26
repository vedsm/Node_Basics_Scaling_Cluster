const cluster = require('cluster');
const http    = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
	for(var i=0;i<numCPUs;i++){
		cluster.fork();
	}

	cluster.on('exit',function(worker,code,signal){
		console.log("worker ${worker.process.pid} has died a horrible death");
	});
}
else{
	http.createServer(function(req,res){
		res.writeHead(200);
		res.end("helllllooooooooo");
	}).listen(8000);
}
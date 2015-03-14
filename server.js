var express = require('express'),
    api     = require('./api'),    
    app     = express();
app
   .use(express.static('./bower_components'))
   .use('/api', api)
   .get('*',function(req, res){
   		res.sendfile('bower_components/index.html')
   }).listen(3000);


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

var inicial = require('./routes/index.js');
var _ = require('underscore');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/company/:name', routes.company);
app.post('/company/add-comment', routes.addComment);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//Parte REST

app.get('/companies', function(request, response) {
	response.send(inicial.companiesshare);
});

app.put('/addcomment/:compa/:comentario', function( req, response ) {
  var company = _(inicial.companiesshare).detect(function(p) {
    return p.name == req.params.compa;
  });

  if(company==null){
    response.send("Empresa " + req.params.compa + " no registrada.\n");
  }

  company.comments.push(req.params.comentario);

	response.send(inicial.companiesshare);
});

module.exports = app;

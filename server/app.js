//install mongo (home brew for me) 
// then install in node - npm install mongo
//install mongoose - npm install mongoose

var express = require('express');
var fs = require('fs');
var app = express();

app.set('mongoose', mongoose = require('mongoose'));
mongoose.connect('mongodb://localhost/startup');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('you are connected to mongo via mongoose');
});

//here's how to set things that routes may need access to (drivers, loggers, etc)
app.set('info', {name: "Open Web App"});

//development environment
app.configure('development', function(){
  //serve the static assets
  app.use(express.static('app'));
});

//production environment
app.configure('production', function(){
  //serve the optimized static assets
  app.use(express.static('build'));
});

//middleware
app.use(express.bodyParser());
app.use(require('./middleware/logging')());

//DB objects
app.set('Node', require('./objects/node.js')(app));
//app.set('ChildNode', require('./objects/childNode.js')(app));

//routes
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  require('./routes/' + file)(app);
});

app.listen(3000);
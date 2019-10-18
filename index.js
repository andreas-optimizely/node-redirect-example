'use strict'

// Libraries
const optimizelyExpress = require('@optimizely/express'),
                express = require('express'),
                    hbs = require('express-handlebars'),
                 routes = require('./routes');

// Setting up app
const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

/*
  Setting up Optimizely Express Middleware package
  (https://github.com/optimizely/express-middleware)

  This will pass the datafile + Optly object in each request
*/

// Replace with your own SDK KEY
let SDK_KEY = 'H9RM6qWYQbPEbmbCfwx3o1'

// Instantiating Optimizely object
const optimizely = optimizelyExpress.initialize({
  sdkKey: SDK_KEY,
  datafileOptions: {
    autoUpdate: true,
    // Setting polling interval to every 5 seconds for demo purposes
    updateInterval: 5000 
  }
});

app.use(optimizely.middleware);

app.use('/', routes);

// Setting up handlebars
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/'
}));

// Starting server
app.listen(PORT, HOST);

console.log(`Example App Running on http://${HOST}:${PORT}`);

module.exports = app;
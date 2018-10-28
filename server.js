// Load the express module and store it in the variable express (Where do you think this comes from?)
const session = require('express-session');
const express = require("express");
const parser = require('body-parser');
const path = require('path');

const index = require('./routes/index');

const port = process.env.PORT || 3000;
// invoke express and store the result in the variable app
const app = express();

const sessionConfig = {
    saveUninitialized: true,
    resave: false,
    name: 'session',
    secret: 'superSekretKitteh'
};

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(session(sessionConfig));
app.set('views', path.join(__dirname, 'views'));

app.use(parser.urlencoded({ extended: true }));

app.use('/', index);            // mount the index route at the '/' path

// catch 404 and forward to error handler
app.use((request, response, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, request, response, next) => {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    // render the error page
    response.render('error', {title: 'Error page'});
  });

// tell the express app to listen on port 3001, always put this at the end of your server.js file
// app.listen(3001, function() { console.log("listening on port 3001"); });         // ES5 way
app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way
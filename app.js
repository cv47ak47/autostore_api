require('./config/config');
require('./global_functions');



var createError = require('http-errors');
var express = require('express');


var passport = require('passport');
var bodyParser = require('body-parser')
var helmet = require('helmet');
var moment = require('moment');



var testRouter = require('./routes/test_r');

const { sanitizeBody } = require('express-validator');
var app = express();


app.use(helmet());
app.use(helmet.frameguard());
app.use(helmet.noCache());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


var DEVICE = 0;

app.use((req, res, next) => {
  console.log(req.method + " - " + req.url)
  console.log("post body=>" + JSON.stringify(req.body))
  console.log("get body=>" + JSON.stringify(req.query))

  next();
});

//app.use(logger(':method :url :status :response-time ms - :res[content-length] :remote-addr'));
app.use(bodyParser.json({ defaultCharset: 'utf-8', limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

//Passport
app.use(passport.initialize());


const models = require("./models");

models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', CONFIG.db_name);
})
  .catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
  });
var expressValidator = require("express-validator");
app.use(sanitizeBody(['*']).trim())


app.use(express.static('public'))
//app.use('/',AuthMiddleware,express.static('public'))

app.use('/test', testRouter);
app.use('/test2', testRouter);
app.use('/test3', testRouter);

app.get('/test', function (req, res) {
  return ReS(res, 'test');
});

app.get('/getallstockdata', function (req, res) {
  return ReS(res, 'getallstockdata');
});

app.get('/getallsupervisordata', function (req, res) {
  return ReS(res, 'getallsupervisordata');
});

app.get('/getallgriddata', function (req, res) {
  return ReS(res, 'getallgriddata');
});

app.get('/getallagvdata', function (req, res) {
  return ReS(res, 'getallagvdata');
});

app.get('/getallalgodata', function (req, res) {
  return ReS(res, 'getallalgodata');
});

app.get('/getallstockbindata', function (req, res) {
  return ReS(res, 'getallstockbindata');
});

app.get('/getallstoragedata', function (req, res) {
  return ReS(res, 'getallstoragedata');
});

app.get('/getallstatisticdata', function (req, res) {
  return ReS(res, 'getallstatisticdata');
});

app.get('/getgriddata/:id', function (req, res) {
  return ReS(res, 'getgriddata/:id');
});

app.get('/getalgodata/:id', function (req, res) {
  return ReS(res, 'getalgodata/:id');
});

app.post('/updategriddata', function (req, res) {
  return ReS(res, 'updategriddata');
});

app.post('/updatealgodata/:id', function (req, res) {
  return ReS(res, 'updatealgodata/:id');
});

app.post('/updateagvdata', function (req, res) {
  return ReS(res, 'updateagvdata');
});

app.post('/addstockdata', function (req, res) {
  return ReS(res, 'addstockdata');
});

app.post('/addstockbindata', function (req, res) {
  return ReS(res, 'addstockbindata');
});

app.post('/addstatisticdata', function (req, res) {
  return ReS(res, 'addstatisticdata');
});

app.post('/deletestockdata/:id', function (req, res) {
  return ReS(res, 'deletestockdata/:id');
});




// app.post('/postclientdata', function (req, res) {
//   return ReS(res, 'postclientdata');
// });

// app.post('/updateclientdata', function (req, res) {
//   return ReS(res, 'updateclientdata');
// });

// app.get('/getallsignagedata', function (req, res) {
//   return ReS(res, 'getallsignagedata');
// });

// app.post('/postsignagedata', function (req, res) {
//   return Response(res, 'postsignagedata')
// });

// app.post('/updatesignagedata', function (req, res) {
//   return ReS(res, 'updatesignagedata');
// });



// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/getvideo', (req, res) => {
//   request(
//     { url: 'https://www.youtube.com/embed/xeR997_I1xk?autoplay=1&loop=1&playlist=xeR997_I1xk' },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });

const getVideoId = require('get-video-id');

getVideoId('https://www.youtube.com/watch?v=8rSH8-pbHZ0');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT) || '3000';
app.listen(port, () => console.log(`Server listening on port ${port}`));



module.exports = app;
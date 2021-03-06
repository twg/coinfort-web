// const express = require('express')
// const opn = require('opn')
//
// const app = express()
// const port = 5000
//
// function allowCrossDomain(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// }
//
// app.use(allowCrossDomain)
// app.use('/', express.static(__dirname + '/public'))
// app.listen(port, (err) => {
//   if (err) {
//     return console.log('something bad happened', err)
//   }
//   console.log(`server is listening on ${port}`)
//   opn(`http://localhost:${port}`)
// })
const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
  ext: 'js'
})
.on('restart', function() {
  console.log('Server restarted!');
})
.once('exit', function () {
  console.log('Shutting down server');
  process.exit();
});

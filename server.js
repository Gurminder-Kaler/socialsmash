const http = require('http')
const app = require('./app')

const port = process.env.PORT || 27020

const server = http.createServer(app)
console.log('Server Running on port : ', port)
server.listen(port)

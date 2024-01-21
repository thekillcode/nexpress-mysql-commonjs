// const https = require('https');
const http = require('http');
// const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const routes = require('../routes/routes');
const routeNotFoundMiddleware = require('../middlewares/routeNotFoundMiddleware');
const defaultErrorHandler = require('../middlewares/defaultErrorHandler');

class App {
  constructor({ port }) {
    this.port = port;
    this.serverInit();
    this.loadPlugins();
    this.loadRoutes();
    this.loadExceptionMiddlewares();
  }
  serverInit() {
    this.app = express();
    this.server = http.createServer(this.app);
    // if (process.env.NODE_ENV == 'production') {
    //   this.server = http.createServer(this.app);
    // } else {
    //   this.server = http.createServer(this.app);
    //   this.server = https.createServer(
    //     {
    //       key: fs.readFileSync('config/localhost+1-key.pem'),
    //       cert: fs.readFileSync('config/localhost+1.pem'),
    //     },
    //     this.app
    //   );
    // }
  }
  loadDevPlugins() {}
  loadPlugins() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(fileUpload({ useTempFiles: true }));
  }
  loadRoutes() {
    this.app.use('/api/v1', routes);
  }
  loadExceptionMiddlewares() {
    this.app.use(routeNotFoundMiddleware);
    this.app.use(defaultErrorHandler);
  }
  startServer() {
    this.server.listen(this.port, () => {
      console.log(`[Server]: Running On http://localhost:${this.port}`);
      console.log(`[Process ID]: PID ${process.ppid}`);
    });
  }
}
module.exports = App;

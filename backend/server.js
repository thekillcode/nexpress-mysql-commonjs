const App = require('./app/App');

const app = new App({ port: process.env.PORT || 8000 });

app.startServer();

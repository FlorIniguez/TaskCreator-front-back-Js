
const app = require('./app');
const conectDB = require('./db');

conectDB();
const PORT = 8080
app.listen(PORT, console.log(`server listening on port ${PORT}`));
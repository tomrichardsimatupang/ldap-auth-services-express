const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.APP_SERVER_PORT || 3000;

app.use(bodyParser.json());

require('./src/services/v1.auth.service')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
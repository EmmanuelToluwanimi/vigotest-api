const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {PORT} = require('./utils/constants');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

app.listen(PORT, async() => {
  routes(app);
  console.log(`Server running on port ${PORT}`);
});

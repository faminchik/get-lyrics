const express = require('express');

const port = 3333;
const app = express();

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening on port ${port}`));

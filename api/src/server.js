const express = require('express');

const dogRouter = require('./routes/dogRouter');

const app = express();

app.use('/dog', dogRouter);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
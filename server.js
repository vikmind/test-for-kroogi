var express = require('express');
var app = express();

app.use(express.static('app'));
app.listen(Number(process.env.PORT || 80));
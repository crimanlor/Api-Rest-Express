const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('tiny'));
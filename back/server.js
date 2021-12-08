const express = require("express");
const cors = require("cors");
const app = new express();
const router = require('./modules/routes')

app.use(express.json());
app.use(cors());
app.use(router)
const PORT = 4000;

app.listen(PORT,console.log('appp is run'));

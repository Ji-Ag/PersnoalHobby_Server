const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var jwt = require('jsonwebtoken');
var {verifyToken} = require('./jwtverify');
require("dotenv").config();

module.exports = router;
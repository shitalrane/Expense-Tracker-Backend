"use strict";
exports.__esModule = true;
var userDb_1 = require("./db/userDb");
try {
    console.log('------');
    (0, userDb_1.createUser)({});
}
catch (e) {
    console.log(e);
}

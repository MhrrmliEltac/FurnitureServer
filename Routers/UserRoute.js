const express = require("express");
const { createUser, getUsers } = require("../Controllers/UserController");

const router = express.Router();

router.get("/get-user", getUsers); 
router.post("/create-user", createUser); 

module.exports = router;

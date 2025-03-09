const express = require("express");
const {
  createProject,
  getAllProject,
} = require("../Controllers/ProjectController");
const router = express.Router();

router.post("/create-project", createProject);
router.get("/project", getAllProject);

module.exports = router;

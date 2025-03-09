const Project = require("../Models/ProjectModels");

exports.createProject = async (req, res) => {
  try {
    const projects = req.body;

    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(400).json({
        message: "An array of projects is required!",
      });
    }

    const validProjects = projects.map((project) => {
      let { name, description, year } = project;

      if (!name || !description || !year) {
        return res.status(400).json({
          message: "Name, project description, and year are required!",
        });
      }

      if (!Number.isInteger(year) || year < 0) {
        return res.status(400).json({
          message: "Year must be a positive integer!",
        });
      }

      let parsedYear = parseInt(year, 10);
      year = parsedYear;

      return {
        name,
        description,
        year: parsedYear,
      };
    });

    const newProjects = await Project.insertMany(validProjects);

    return res.status(201).json({
      message: "Projects created successfully",
      projects: newProjects,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllProject = async (req, res) => {
  try {
    const project = await Project.find();
    return res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

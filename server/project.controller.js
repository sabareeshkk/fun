var project = require('../models/project');


// Creates a new project in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(project);
  });
};

// Get list of projects
exports.index = function(req, res) {
  project.find(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(projects);
  });
};
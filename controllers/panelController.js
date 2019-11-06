var Panel = require("../models/panel");

// Good validation documentation available at https://express-validator.github.io/docs/
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// Display list of all posts.
exports.index = function(req, res, next) {
  const { id } = req.params;

  Panel.findOne({ id: id })
    .sort({ timestamp: -1 })
    .exec(function(err, panel) {
      if (err) {
        return next(err);
      }

      res.json(panel);
    });
};

// Handle book create on POST.
exports.save = function(req, res, next) {
  const { id } = req.params;
  const { value } = req.body;

  // Create a post object
  // Improve: Use promises with .then()
  var panel = new Panel({
    id: id,
    value: value,
    timestamp: new Date()
  });

  panel.save(function(err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new book record.
    res.status(200).end();
  });
};

exports.clear = function(req, res, next) {
  Panel.remove({}).exec(function(err) {
    if (err) {
      return next(err);
    }

    res.status(200).end();
  });
};

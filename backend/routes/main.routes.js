const express = require('express');

const mainRouter = new express.Router();
// Add routes
mainRouter.get('/', async (req, res, next) => {
  try {
    return res.json({
      message: 'Welcome to Api Server ',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = mainRouter;

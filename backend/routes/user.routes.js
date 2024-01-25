const express = require('express');

const userRouter = new express.Router();
// Add routes
userRouter.get('/', async (req, res, next) => {
  try {
    return res.json({
      message: 'Profile',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;

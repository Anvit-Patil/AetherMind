const express = require("express");

const createtd = (req, res) => {
  if (req.body.text) {
    throw Error("Text is required");
  }
  res.json({
    successful: true,
    data: req.body,
  });
};

const gettd = (req, res) => {
  // get all todos

  res.json({
    successful: true,
    data: { id: 1, text: "Learn Node js, again and again, and again?" },
  });
};

module.exports = {
  createtd,
  gettd,
};

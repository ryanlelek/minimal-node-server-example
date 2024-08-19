// Modules
import express from "express";
import body_parser from "body-parser";
import helmet from "helmet";

// New Express App
const app = express();

// Routes
app.get("/", function (req, res) {
  if (!req.body) {
    req.body = "empty";
  }
  res.status(200).json({
    message: "GET-plain",
    body: req.body,
    query: req.query,
  });
});
app.post("/", function (req, res) {
  if (!req.body) {
    req.body = "empty";
  }
  res.status(201).json({
    message: "POST-plain",
    body: req.body,
    query: req.query,
  });
});
app.get("/bodyparser-json", [
  body_parser.json(),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(200).json({
      message: "GET-bodyparser-json",
      body: req.body,
      query: req.query,
    });
  },
]);
app.post("/bodyparser-json", [
  body_parser.json(),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(201).json({
      message: "POST-bodyparser-json",
      body: req.body,
      query: req.query,
    });
  },
]);
app.get("/bodyparser-urlencoded", [
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(200).json({
      message: "GET-bodyparser-urlencoded",
      body: req.body,
      query: req.query,
    });
  },
]);
app.post("/bodyparser-urlencoded", [
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(201).json({
      message: "POST-bodyparser-urlencoded",
      body: req.body,
      query: req.query,
    });
  },
]);
app.get("/bodyparser-both", [
  body_parser.json(),
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(200).json({
      message: "GET-bodyparser-both",
      body: req.body,
      query: req.query,
    });
  },
]);
app.post("/bodyparser-both", [
  body_parser.json(),
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(201).json({
      message: "POST-bodyparser-both",
      body: req.body,
      query: req.query,
    });
  },
]);
app.get("/bodyparser-both-helmet", [
  helmet({
    contentSecurityPolicy: false,
  }),
  body_parser.json(),
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(200).json({
      message: "GET-bodyparser-both-helmet",
      body: req.body,
      query: req.query,
    });
  },
]);
app.post("/bodyparser-both-helmet", [
  helmet({
    contentSecurityPolicy: false,
  }),
  body_parser.json(),
  body_parser.urlencoded({ extended: false }),
  function (req, res) {
    if (!req.body) {
      req.body = "empty";
    }
    res.status(201).json({
      message: "POST-bodyparser-both-helmet",
      body: req.body,
      query: req.query,
    });
  },
]);

// Error Handler - Basic
app.use(function (error, req, res, next) {
  res.status(500).json({
    error: error,
    body: req.body,
    query: req.query,
  });
});

// HTTP Server
app.listen(8085, "0.0.0.0", () => {
  console.log(`HTTP server listening on port 8085`);
});

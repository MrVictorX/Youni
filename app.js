"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

//roteamento
app.get("/user", requestHandlers.getUsers);
app.get("/questions", requestHandlers.getQuestions);
app.get("/questions/:id/answers", requestHandlers.getAnswer);

app.post("/user", requestHandlers.createUser);
app.delete("/user/:id", requestHandlers.removeUser);

app.post("/questions", requestHandlers.createQuestion);
app.delete("/question/:id", requestHandlers.removeQuestion);

app.post("/question/:id/answers", requestHandlers.createAnswer);
app.delete("/question/:id/answers/:id_a", requestHandlers.deteleAnswer);

app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
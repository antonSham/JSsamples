const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const users = [{ id: 0, name: "John Smith", age: 19 }];

const app = express();

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.post("/api/user", bodyParser.json(), (req, res) => {
  if (!req.body.hasOwnProperty("name")) {
    res.status(400).send({ error: 'Property "name" has not been found' });
    return;
  }
  if (typeof req.body.name !== "string") {
    res.status(400).send({ error: 'Property "name" must be a string' });
    return;
  }
  if (req.body.name.length === 0) {
    res.status(400).send({ error: 'Property "name" must not be emty' });
    return;
  }

  if (!req.body.hasOwnProperty("age")) {
    res.status(400).send({ error: 'Property "age" has not been found' });
    return;
  }
  if (typeof req.body.age !== "number") {
    res.status(400).send({ error: 'Property "age" must be a number' });
    return;
  }
  if (!(0 <= req.body.age && req.body.age <= 200)) {
    res
      .status(400)
      .send({ error: 'Property "age" must not be within 0...200 interval' });
    return;
  }

  const id = users.length;
  users.push({ id, name: req.body.name, age: req.body.age });
  res.status(200).send({ id });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080, () => console.log("Server has started on port 8080"));

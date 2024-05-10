require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
app.use(express.json());

// morgan.token("body", (request, response) => JSON.stringify(request.body));
// const morganFormat =
//   ":method :url :status :res[content-length] - :response-time ms :body";
// app.use(morgan(morganFormat));

app.use(cors());
app.use(express.static("dist"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  const personCount = persons.length;
  const infoMessage = personCount === 1 ? "person" : "people";
  response.send(
    `<p>Phonebook has info for ${personCount} ${infoMessage}</p><p>${date}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name === person.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

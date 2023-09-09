const express = require('express');
const app = express();

// Serves Express Yourself website
app.use(express.static('public'));

const { getElementById, getIndexById, updateElement,
        seedElements, createElement } = require('./utils');

const expressions = [];
seedElements(expressions, 'expressions');
const animals = [];
seedElements(animals, 'animals');

const PORT = process.env.PORT || 4001;
// GET route to return an array of all elements
app.get('/expressions', (req, res, next) => {
  res.send(expressions);
});
app.get('/animals', (req, res, next) => {
  res.send(animals);
});

//  GET route to respond with a single element

app.get('/expressions/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});
app.get('/animals/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, animals);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// PUT route to update an element in an array and send back the updated array

app.put('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});
app.put('/animals/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, animals);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, animals);
    res.send(animals[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// POST route to add new elements in the array and respond with the new array

app.post('/expressions', (req, res, next) => {
  const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});
app.post('/animals', (req, res, next) => {
  const receivedExpression = createElement('animals', req.query);
  if (receivedExpression) {
    animals.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});


// DELETE route to delete an element by it's ID

app.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
app.delete('/animals/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, animals);
  if (expressionIndex !== -1) {
    animals.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
});

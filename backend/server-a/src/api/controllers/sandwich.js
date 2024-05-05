let nextId = 1;
let sandwiches = new Map([
    [nextId++, { id: 1, name: 'Ham Sandwich', price: 5.99 }],
    [nextId++, { id: 2, name: 'Turkey Sandwich', price: 6.99 }],
    [nextId++, { id: 3, name: 'Chicken Sandwich', price: 7.99 }],
  ]);

exports.getAllSandwiches = (req, res) => {
  const allSandwiches = Array.from(sandwiches.values());
  res.json(allSandwiches);
};

exports.createSandwich = (req, res) => {
  const newSandwich = {
    id: nextId++,
    name: req.body.name,
  };
  sandwiches.set(newSandwich.id, newSandwich);
  res.status(201).json(newSandwich);
};

exports.getSandwich = (req, res) => {
  const sandwich = sandwiches.get(parseInt(req.params.sandwichId));
  if (!sandwich) {
    res.status(404).send('Sandwich not found.');
  } else {
    res.json(sandwich);
  }
};

exports.updateSandwich = (req, res) => {
  let sandwich = sandwiches.get(parseInt(req.params.sandwichId));
  if (!sandwich) {
    res.status(404).send('Sandwich not found.');
  } else {
    sandwich = { ...sandwich, ...req.body };
    sandwiches.set(sandwich.id, sandwich);
    res.json(sandwich);
  }
};

exports.deleteSandwich = (req, res) => {
  const isDeleted = sandwiches.delete(parseInt(req.params.sandwichId));
  if (isDeleted) {
    res.status(200).send(`Deleted sandwich with id ${req.params.sandwichId}`);
  } else {
    res.status(404).send('Sandwich not found.');
  }
};
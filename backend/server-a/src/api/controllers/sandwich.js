let nextId = 1;
let sandwiches = new Map([
  [
    nextId++,
    {
      id: 1,
      name: "Ham Sandwich",
      price: 5.99,
      image:
        "https://www.thespruceeats.com/thmb/f09Vbw00N1DCg4yeu_Lf0a_gUtc=/3580x2387/filters:no_upscale():max_bytes(150000):strip_icc()/turkey-reuben-sandwich-2937621-hero-01-d98a70a112204ec09ef00183b5cbfe29.jpg",
      description: "A delicious ham sandwich.",
    },
  ],
  [
    nextId++,
    {
      id: 2,
      name: "Turkey Sandwich",
      price: 6.99,
      image:
        "https://img.taste.com.au/M-_CL2dx/taste/2018/02/loaded-turkish-bread-sandwich-135784-2.jpg",
      description: "A tasty turkey sandwich.",
    },
  ],
  [
    nextId++,
    {
      id: 3,
      name: "Chicken Sandwich",
      price: 7.99,
      image:
        "https://cdn.tasteatlas.com/images/dishes/c0dbb76c039542d3a0d8a6ef4290e40e.jpg?w=905&h=510",
      description: "A scrumptious chicken sandwich.",
    },
  ],
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
    res.status(404).send("Sandwich not found.");
  } else {
    res.json(sandwich);
  }
};

exports.updateSandwich = (req, res) => {
  let sandwich = sandwiches.get(parseInt(req.params.sandwichId));
  if (!sandwich) {
    res.status(404).send("Sandwich not found.");
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
    res.status(404).send("Sandwich not found.");
  }
};

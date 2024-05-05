module.exports = function (app) {
  const orderController = require("../controllers/order");
  const sandwichController = require("../controllers/sandwich");

  // Order Routes
  app
    .route("/order")
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

  app.route("/order/:orderId").get(orderController.getOrder);

  // Sandwich Routes
  app
  .route("/sandwich")
  .get(sandwichController.getAllSandwiches)
  .post(sandwichController.createSandwich);

app
  .route("/sandwich/:sandwichId")
  .get(sandwichController.getSandwich)
  .put(sandwichController.updateSandwich)
  .delete(sandwichController.deleteSandwich);
};
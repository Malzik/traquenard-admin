module.exports = app => {
    const question = require("../controllers/question.js");

    // Create a new Customer
    app.post("/question", question.create);

    // Retrieve all Customers
    app.get("/question", question.findAll);

    // Retrieve a single Customer with customerId
    app.get("/question/:questionId", question.findById);

    // Update a Customer with customerId
    app.put("/question/:questionId", question.update);

    // Delete a Customer with customerId
    app.delete("/question/:questionId", question.delete);
};
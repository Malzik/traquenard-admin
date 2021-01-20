module.exports = app => {
    const question = require("../controllers/question.js");

    // Create a new Customer
    app.post("/api/question", question.create);

    // Retrieve all Customers
    app.get("/api/question", question.findAll);

    // Retrieve a single Customer with customerId
    app.get("/api/question/:questionId", question.findById);

    // Update a Customer with customerId
    app.put("/api/question/:questionId", question.update);

    // Delete a Customer with customerId
    app.delete("/api/question/:questionId", question.delete);
};
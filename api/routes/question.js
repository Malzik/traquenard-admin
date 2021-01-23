module.exports = app => {
    const question = require("../controllers/question.js");

    app.post("/api/question", question.create);

    app.get("/api/question", question.findAll);

    app.get("/api/question/:typeId", question.findAllByType);

    app.get("/api/question/:questionId", question.findById);

    app.put("/api/question/:questionId", question.update);

    app.delete("/api/question/:questionId", question.delete);
};
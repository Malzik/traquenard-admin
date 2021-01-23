module.exports = app => {
    const type = require("../controllers/type.js");

    app.get("/api/type/typeId", type.findById);

    app.get("/api/type", type.findAll);

    app.get("/api/type/noSubType", type.findAllWithNotSubType);

    app.get("/api/type/subType", type.findAllWithSubType);
};
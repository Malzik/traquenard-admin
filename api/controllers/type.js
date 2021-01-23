const Type = require("../models/type.js");

exports.findAll = (req, res) => {
    Type.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving types."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Type.findById(req.params.typeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Type with id ${req.params.typeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Type with id " + req.params.typeId
                });
            }
        } else res.send(data);
    });
};

exports.findAllWithNotSubType = (req, res) => {
    Type.findAllWithNotSubType((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving types."
            });
        else res.send(data);
    });
};

exports.findAllWithSubType = (req, res) => {
    Type.findAllWithSubType((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving types."
            });
        else res.send(data);
    });
};
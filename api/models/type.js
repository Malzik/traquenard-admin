const sql = require("./db.js");

const Type = function(type) {
    this.rule = type.id;
    this.sip = type.name;
};

Type.findById = (typeId, result) => {
    sql.query(`SELECT * FROM type WHERE id = ${typeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found type: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Type.findAll = result => {
    sql.query("SELECT * from type where id not in (select subtype_id FROM type where subtype_id IS NOT NULL)", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Type.findAllWithNotSubType = result => {
    sql.query("SELECT * from type where id not in (SELECT distinct(subtype_id) from type where subtype_id is not null) AND subtype_id IS NULL",
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Type.findAllWithSubType = result => {
    sql.query("SELECT t.id as id, t.name as name, t2.name as parent_name FROM type t LEFT JOIN type t2 on t.subtype_id = t2.id WHERE t.subtype_id is NOT NULL",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        });
};

module.exports = Type;

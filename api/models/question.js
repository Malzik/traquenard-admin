const sql = require("./db.js");

// constructor
const Question = function(question) {
    this.rule = question.rule;
    this.sip = question.sip;
    this.answers = question.answers;
    this.lang = question.lang;
};

Question.create = (newQuestion, result) => {
    sql.query("INSERT INTO question SET ?", newQuestion, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created question: ", { id: res.insertId, ...newQuestion });
        result(null, { id: res.insertId, ...newQuestion });
    });
};

Question.findById = (questionId, result) => {
    sql.query(`SELECT * FROM question WHERE id = ${questionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found question: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Question.findAll = result => {
    sql.query("SELECT question.id, question.rule, question.sip, question.lang, question.answers, type.name as name FROM question LEFT JOIN type ON type.id = question.type_id ORDER BY type.id", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Question.updateById = (id, question, result) => {
    sql.query(
        "UPDATE question SET rule = ?, sip = ?, answers = ? WHERE id = ?",
        [question.rule, question.sip, question.answers, id],
        (err, res) => {
            if (err) {
                result(err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id: id, ...question });
        }
    );
};

Question.remove = (id, result) => {
    sql.query("DELETE FROM question WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows === 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted question with id: ", id);
        result(null, res);
    });
};

module.exports = Question;

//const mysql = require("mysql");
//const options = require("./connectionOptions.json")

/**
* Function to return all users in a list from the DB
* @param {*} req 
* @param {*} res 
*/
/**function getUsers(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT * FROM user";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to user table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "user": rows });
        }
    });
}
module.exports.getUsers = getUsers;
*/


/**
 * Função que permite criar ou editar um jogador, consoante o pedido enviado pelo cliente.
 * 
 * @param {Object} req
 * @param {Object} res
 */
/** 
function createUser(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var name = req.body.name;
    var email = req.body.email;
    var sql = mysql.format("INSERT INTO user(name, email) VALUES (?,?);", [name, email]);
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createUser = createUser;
*/

/**
* Function that allows to remove a user
* 
* @param {Object} req 
* @param {Object} res 
*//**
function removeUser(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var sql = mysql.format("DELETE FROM user WHERE id = ?", [req.params.id]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removeUser = removeUser;
*/


/**
 * Function that returns a list of questions from the DB.
 * @param {*} req 
 * @param {*} res 
 *//**
function getQuestions(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT * FROM question";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to question table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "question": rows });
        }
    });
}
module.exports.getQuestions = getQuestions;

*/
/**
 * Function that creates a question in the DB.
 * 
 * @param {Object} req
 * @param {Object} res
 */
/**
function createQuestion(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var content = (req.body.content) ? req.body.content : null;
    var document = (req.body.document) ? req.body.document : null;
    var anonymous = req.body.anonymous;
    var sql = mysql.format("INSERT INTO question(content, document, anonymous) VALUES (?,?,?)", [content, document, anonymous]);
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();
}
module.exports.createQuestion = createQuestion;

*/
/**
* Function that allows to remove a question
* 
* @param {Object} req
* @param {Object} res
*/
/**function removeQuestion(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var sql = mysql.format("DELETE FROM question WHERE id = ?", [req.params.id]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removeQuestion = removeQuestion;
*/



/**
    * Function that returns a list of answers from the DB from a specific question.
    * @param {*} req 
    * @param {*} res 
    */
/**function getAnswer(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT * FROM answer JOIN question_answer ON id = answer_id JOIN question ON question_id=question.id WHERE id=answer_id AND question_id = question.id";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to answer table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "answer": rows });
        }
    });
}
module.exports.getAnswer = getAnswer;
*/

/**
 * Function that allows to create an answer to a question
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */

/**function createAnswer(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var content = (req.body.content) ? req.body.content : null;
    var document = (req.body.document) ? req.body.document : null;
    
    var sql1 = mysql.format("INSERT INTO answer(content,document) VALUES (?,?);", [content, document]);
    
    connection.query(sql1, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        }
    });
    
    connection.end();
}
module.exports.createAnswer = createAnswer;
*/
/**
* Function that allows to remove an answer
* 
* @param {Object} req
* @param {Object} res
*/
/**function removeAnswer(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var sql = mysql.format("DELETE FROM answer WHERE id = ?", [req.params.id]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removeAnswer = removeAnswer;

*/

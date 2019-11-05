const defaultData = require('./defaultData');
const mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
    
});

function GetTable(email,cb) {
    const query = 'SELECT kanban from `Users` WHERE mail = ?;';
    connection.query(query, [email], function (error, results, fields) {
        if(error) {
            cb(error);
        }
        else if(results[0]){
            cb(null, JSON.parse(results[0].kanban));
        }
        else {
            cb(null,null);
        }
    });
}
function UpdateTable(email, table,cb) {
    const query = 'UPDATE Users SET kanban = ? WHERE mail = ?;';
    connection.query(query, [JSON.stringify(table),email], function (error, results, fields) {
        if(error) {
            cb(error);
        }
        else {
            cb(null);
        }
    });
}

function GetPassword(email,cb) {
    connection.query('SELECT * FROM `Users` WHERE mail = ?;', [email], function (error, results, fields) {
        if(error) {
            cb(error);
        }
        else if(results[0]){
            cb(null, results[0].Password);
        }
        else {
            cb(null,null);
        }
    });

}

function CreateUser(email, password,cb) {
    const query = 'INSERT INTO Users (mail,password, kanban) VALUES ( ? , ? , ? );'
    connection.query(query, [email, password, JSON.stringify(defaultData)], function (error, results, fields) {
        if(error) {
            cb(error); 
        }
        else {
            cb(null);
        }
       
    });
}
module.exports = { GetTable, GetPassword, CreateUser, UpdateTable };
const defaultData = require('./defaultData');
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function GetTable(email,cb) {
    cb(null,defaultData);
}
function UpdateTable(email, table,cb) {
    cb(null);
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
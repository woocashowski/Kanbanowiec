const defaultData = require('./defaultData');
function GetTable(email) {
    return defaultData;
}

function GetPassword(email) {
    return "test";
}

function CheckIfCanCreateUser(email,password) {
    return true;
}

function CreateUser(email,password) {
    return true;
}
module.exports = {GetTable, GetPassword, CheckIfCanCreateUser, CreateUser};
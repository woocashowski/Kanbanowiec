const defaultData = require('./defaultData');
function GetTable(email) {
    return defaultData;
}

function GetPassword(email) {
    return "test";
}
module.exports = {GetTable};
const tokenGen = require('token');
const db = require('./db');
tokenGen.defaults.secret = process.env.SECRET_KEY;
tokenGen.defaults.timeStep = 60 * 60; // 1h in seconds

function GenerateToken(email) {
    return tokenGen.generate(email);
}
function VerifyUser(email, password, cb) {
    db.GetPassword(email,
        (err, passFromDB) => {
            if (err) {
                cb(err);
            }
            else if (password === passFromDB) {
                cb(null, GenerateToken(email));
            }
            else {
                cb(null, null);
            }
        });
}
function VerifyToken(email, token) {
    let resp = tokenGen.verify(email, token);
    if (resp == 1 || resp == 2) {
        return true;
    }
    return false;
}

module.exports = { VerifyUser, VerifyToken };
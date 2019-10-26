const tokenGen = require('token')
tokenGen.defaults.secret = process.env.SECRET_KEY;
tokenGen.defaults.timeStep = 60 * 60; // 1h in seconds

function GenerateToken(email) {
    return tokenGen.generate(email);
}

function VerifyTestUser(email,password) {
    if(email === 'test@gmail.com' && password == 'test') {
        return true;
    }

    return false;
}

function VerifyUser(email,password) {
    if(process.env.MODE === 'dev') {
        return VerifyTestUser(email,password);
    }
    return false;
}

function CheckLogin(email,password) {
    if( VerifyUser(email,password) ) {
        return {
            email, token: GenerateToken(email)
        }
    }
    throw new CustomException('Not verified user!');
}

function VerifyToken(email, token) {
    let resp = tokenGen.verify(email, token);
    console.log(resp);
    if(resp == 1 || resp == 2) {
        return true;
    }
    return false;
}

module.exports = { CheckLogin, VerifyToken };
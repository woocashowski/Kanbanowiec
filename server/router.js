var express = require('express')
var router = express.Router()
const verify = require('./verify');
const db = require('./db');
const md5 = require('md5');
// middleware that is specific to this router
router.use(
    function timeLog(req, res, next) {
        // console.log(req);
        console.log(CurrentTime());
        next();
    })
function CurrentTime() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}

//Load site
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// login request
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    console.log("login request " + CurrentTime());
    console.log(req.body);

    verify.VerifyUser(email, md5(password), (err, token) => {
        if (err) {
            res.status(401).json({
                msg: "Wrong login data."
            })
        }
        else if (token) {
            res.json({ email, token });
        }
        else {
            res.status(401).json({
                msg: "Wrong login data."
            })
        }
    })
})
// get table request
router.post('/table', (req, res) => {
    console.log("table request " + CurrentTime());
    console.log(req.body);
    let { email, token } = req.body;
    if (verify.VerifyToken(email, token)) {
        db.GetTable(email, (err, table) => {
            if (err) {
                console.log(err.code);
                res.status(500).json({
                    msg: "Internal error."
                });
            }
            else if(table){
                res.json(table);
            }
            else {
                res.status(500).json({
                    msg: "Internal error."
                });
            }
        });

    }
    else {
        res.status(401).json({
            msg: "Wrong token!"
        });
    }
})
// signup request
router.post('/signup', (req, res) => {
    console.log("signup request " + CurrentTime());
    console.log(req.body);
    let { email, password } = req.body;
    db.CreateUser(email, md5(password), (err) => {
        if (err) {
            res.json({
                success: false,
                msg: "Cannot create such user."
            })
        }
        else {
            res.json({
                success: true,
                msg: "OK"
            })
        }
    })
})
// verify token
router.post('/verify', (req, res) => {
    let { email, token } = req.body;
    console.log("verify req" + CurrentTime());
    if (verify.VerifyToken(email, token)) {
        res.json({
            success: true
        });
    }
    else {
        res.json({ success: false }).status(401);
    }
})
router.put('/update', (req, res) => {
    let { email, token, table } = req.body;
    console.log("update table request by " + email + " - " + CurrentTime());
    if (verify.VerifyToken(email, token)) {
        db.UpdateTable(email, table, (err) => {
            if (err) {
                console.log(err.code);
                res.json({ success: false }).status(500);
            }
            else {
                res.json({
                    success: true
                });
            }
        });
    }
    else {
        res.json({ success: false }).status(401);
    }
})

module.exports = router
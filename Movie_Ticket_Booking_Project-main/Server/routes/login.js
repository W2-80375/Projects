const express = require('express');
const mysql = require('mysql');
const config = require('config');
const jwt = require('jsonwebtoken');
const app = express.Router();

const connectionDetails = mysql.createConnection( {
    host: config.get("SERVER"),
    database: config.get("DATABASE"),
    user: config.get("USER"),
    password: config.get("PASSWORD"),
})



app.post('/', (req, res) => {
    const { email, password } = req.body;

    connectionDetails.query(
        'SELECT user_id, first_name, last_name, role FROM users WHERE email_id = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (results.length === 1) {
                const user = results[0];

               
                const token = jwt.sign({ user_id: user.user_id, role: user.role }, config.get('jwtSecret'), {
                    expiresIn: '1h' 
                });

               
                res.status(200).json({
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role : user.role,
                    token: token
                });
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    );
});

module.exports = app;
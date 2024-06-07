// const express = require('express');
// const mysql = require('mysql');
// const config = require('config');

// const app = express.Router();

// const connectionDetails = {
//     host: config.get("SERVER"),
//     database: config.get("DATABASE"),
//     user: config.get("USER"),
//     password: config.get("PASSWORD"),
// }


// app.get("/", (request, response) => {
//     response.write("GET request for Login received.")
//     response.end();
// })

// const GenerateToken = () => {
//     return Math.floor(Math.random() * 100000);
// }

// app.post("/", (request, response) => {
//     console.log(request.body);

//     const email = request.body.email;
//     const password = request.body.password;

//     console.log(email);
//     console.log(password);

//     const connection1 = mysql.createConnection(connectionDetails)
//     const statement1 = `select count(*) as count from users where email_id='${email_id}' and password='${password}'`;

//     console.log(statement1);

//     connection1.query(statement1, (error, result) => {
//         if (error == null) {
//             console.log("query successfull.");
//             console.log(result);

//             let count = result[0].count;
//             if (count > 0) {
//                 console.log("U r a valid user!");
//                 var token = GenerateToken();
//                 console.log(`generated token ${token} for ${email}`);

//                 let connection2 = mysql.createConnection(connectionDetails);

//                 let statement2 = `update users set token='${token}' where email='${email}'`;

//                 console.log(statement2);

//                 connection2.query(statement2,
//                     (error2, result2) => {
//                         if (error2 == null) {
//                             if (result2.affectedRows > 0) {
//                                 let reply = {
//                                     token: token,
//                                     message: "success"
//                                 };
//                                 response.setHeader("Content-Type",
//                                     "application/json");
//                                 response.write(JSON.stringify(reply));
//                                 connection2.end();
//                                 response.end();

//                             }
//                             else {
//                                 let reply = {
//                                     message: "problem updating token in DB"
//                                 };
//                                 response.setHeader("Content-Type",
//                                     "application/json");
//                                 response.write(JSON.stringify(reply));
//                                 connection2.end();
//                                 response.end();
//                             }
//                         }
//                         else {
//                             console.log(error2);
//                             response.setHeader("Content-Type",
//                                 "application/json");
//                             response.write(JSON.stringify(error2));
//                             connection2.end();
//                             response.end();
//                         }
//                     });

//             }
//             else {
//                 console.log("No user found!")
//                 let reply = { message: "No Match Found" }
//                 response.setHeader("Content-Type", "application/json");

//                 response.write(JSON.stringify(reply));
//                 connection1.end();
//                 response.end();
//             }
//         }
//         else {
//             console.log(error);
//             console.log("query failed.");

//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(error));
//             connection1.end();
//             response.end();
//         }
//     })

// })

// module.exports = app;




const express = require('express');
const mysql = require('mysql');
const config = require('config');

const app = express.Router();

const connectionDetails = {
    host: config.get("SERVER"),
    database: config.get("DATABASE"),
    user: config.get("USER"),
    password: config.get("PASSWORD"),
}

app.get("/", (request, response) => {
    response.write("GET request for Login received.")
    response.end();
})

const GenerateToken = () => {
    return Math.floor(Math.random() * 100000);
}

app.post("/", (request, response) => {
    console.log(request.body);

    const email = request.body.email_id;
    const password = request.body.password;

    console.log(email);
    console.log(password);

    const connection1 = mysql.createConnection(connectionDetails)
    const statement1 = `SELECT COUNT(*) AS count FROM users WHERE email_id='${email}' AND password='${password}' AND role='${admin}'`;
   
    console.log(statement1);

    connection1.query(statement1, (error, result) => {
        if (error == null) {
            console.log("Query successful.");
            console.log(result);

            let count = result[0].count;
            if (count > 0) {
                console.log("You are a valid admin!");
                var token = GenerateToken();
                console.log(`Generated token ${token} for ${email}`);

                let connection2 = mysql.createConnection(connectionDetails);

                let statement2 = `UPDATE users SET token='${token}' WHERE email_id='${email}'`;

                console.log(statement2);

                connection2.query(statement2,
                    (error2, result2) => {
                        if (error2 == null) {
                            if (result2.affectedRows > 0) {
                                let reply = {
                                    token: token,
                                    message: "success"
                                };
                                response.setHeader("Content-Type",
                                    "application/json");
                                response.write(JSON.stringify(reply));
                                connection2.end();
                                response.end();

                            } else {
                                let reply = {
                                    message: "Problem updating token in DB"
                                };
                                response.setHeader("Content-Type",
                                    "application/json");
                                response.write(JSON.stringify(reply));
                                connection2.end();
                                response.end();
                            }
                        } else {
                            console.log(error2);
                            response.setHeader("Content-Type",
                                "application/json");
                            response.write(JSON.stringify(error2));
                            connection2.end();
                            response.end();
                        }
                    });

            } else {
                console.log("No admin user found!")
                let reply = { message: "No Match Found" }
                response.setHeader("Content-Type", "application/json");

                response.write(JSON.stringify(reply));
                connection1.end();
                response.end();
            }
        } else {
            console.log(error);
            console.log("Query failed.");

            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection1.end();
            response.end();
        }
    })

})

module.exports = app;

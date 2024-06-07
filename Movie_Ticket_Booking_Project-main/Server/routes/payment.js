const mysql = require('mysql');
const express = require('express');
const config = require('config');

const app =  express.Router();

let connectionDetails = {
                            host: config.get("SERVER"),
                            database: config.get("DATABASE"),
                            user: config.get("USER"),
                            password: config.get("PASSWORD")
                        }

app.get("/", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let statement = "select * from payment";

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
             response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

app.post("/", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let { payment_id, amount, payment_date_time, payment_method, user_id, show_id, payment_status,booking_id } = request.body;   
    
    let statement = 
        `insert into payment values(${payment_id}, '${amount}','${payment_date_time}','${payment_method}','${user_id}','${show_id}','${payment_status}','${booking_id}')`;

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

app.delete("/:payment_id", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let id = request.params.payment_id;rt 
  
    let statement = 
        `delete from payment where payment_id =${id}`;

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
            connection.end();
            response.end();
        }
        else
        {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
            connection.end();
            response.end();
        }
    })
});

module.exports = app;
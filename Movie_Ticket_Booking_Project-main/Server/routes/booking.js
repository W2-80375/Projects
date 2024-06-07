const mysql = require('mysql');
const express = require('express');
const config = require('config');

const app =  express.Router();

var connectionDetails = {
                     host: config.get("SERVER"),
                     database: config.get("DATABASE"),
                     user: config.get("USER"),
                     password: config.get("PASSWORD"),
                        }

app.get("/", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let statement = "select * from booking";

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

    let { booking_id, number_of_seats, timestamp, user_id, show_id } = request.body;   
    
    let statement = 
        `insert into booking values(${booking_id}, ${number_of_seats},'${timestamp}',${user_id},${show_id})`;

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

app.put("/:booking_id", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let { booking_id, number_of_seats, timestamp, user_id, show_id} = request.body;   

    let statement = 
        `update booking set number_of_seats ='${number_of_seats}',timestamp='${timestamp}',user_id=${user_id},show_id=${show_id} where booking_id=${booking_id}`;
    console.log(statement);

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
app.delete("/:booking_id", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let id = request.params.booking_id;//This data belongs to header part 
  
    let statement = 
        `delete from booking where booking_id =${id}`;

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

module.exports =app;
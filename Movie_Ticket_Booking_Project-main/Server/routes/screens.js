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
    var connection = mysql.createConnection(connectionDetails);

    var statement = "select * from screens";

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
    var connection = mysql.createConnection(connectionDetails);

    var id = request.body.screen_id;
    var name = request.body.screen_name;
    var status = request.body.status;
    var showSeatId = request.body.show_seat_id;
    
    var statement = 
        `insert into screens values(${id}, '${name}','${status}',${showSeatId})`;

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

app.put("/:screen_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.screen_id;
    var name = request.body.screen_name;
    var statuss = request.body.status;
    var showSeatId = request.body.show_seat_id;

    var statement = 
        `update screens set screen_name ='${name}',status='${statuss}',show_seat_id=${showSeatId} where screen_id=${id}`;
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
app.delete("/:screen_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.screen_id;
  
    var statement = 
        `delete from screens where screen_id =${id}`;

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
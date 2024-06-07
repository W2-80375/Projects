const mysql = require('mysql');
const express = require('express');
const config = require('config');

const app =  express.Router();

var connectionDetails = {
                        host: config.get("SERVER"),
                        database: config.get("DATABASE"),
                        user: config.get("USER"),
                        password: config.get("PASSWORD")
                        }

app.get("/", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var statement = "select * from theaters";

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

    var id = request.body.theatre_id;
    var name = request.body.theatre_name;
    var adr = request.body.address;
    var rat =request.body.rating;
    var totSeat = request.body.total_seats;
    var scrId = request.body.screen_id;
    
    var statement = 
        `insert into theaters values(${id}, '${name}','${adr}',${rat},${totSeat},${scrId})`;

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

app.put("/:theatre_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

  
    var id = request.params.theatre_id;
    var name = request.body.theatre_name;
    var adr = request.body.address;
    var rat =request.body.rating;
    var totSeat = request.body.total_seats;
    var scrId = request.body.screen_id;
    

    var statement = 
        `update theaters set theatre_name='${name}',address='${adr}',rating='${rat}',total_seats='${totSeat}',screen_id='${scrId}' where theatre_id =${id}`;

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
app.delete("/:theatre_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.theatre_id;
  
    var statement = 
        `delete from theaters where theatre_id =${id}`;

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
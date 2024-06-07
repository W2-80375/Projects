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

    var statement = "select * from show_seat";

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

    var id = request.body.show_seat_id;
    var theatreId = request.body.theatre_id;
    var sta = request.body.status;
    var priceT = request.body.price;
    var showId = request.body.show_id;
    var bookingId = request.body.booking_id;
    var seatNo = request.body.seat_no;


    
    
    var statement = 
        `insert into show_seat values(${id}, ${theatreId},${sta},${priceT},${showId},${bookingId},${seatNo})`;

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

app.put("/:show_seat_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.show_seat_id;
    var theatreId = request.body.theatre_id;
    var sta = request.body.status;
    var priceT = request.body.price;
    var showId = request.body.show_id;
    var bookingId = request.body.booking_id;
    var seatNo = request.body.seat_no;
   


    var statement = 
        `update show_seat set theatre_id =${theatreId},status = ${sta},price=${priceT},show_id=${showId},booking_id=${bookingId},seat_no=${seatNo} where show_seat_id=${id}`;
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
app.delete("/:show_seat_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.show_seat_id;
  
    var statement = 
        `delete from show_seat where show_seat_id =${id}`;

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
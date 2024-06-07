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

    var statement = "select * from shows";

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

    var id = request.body.show_id;
    var show_date = request.body.date;
    var time = request.body.start_time;
    var screen =request.body.screen_id;
    var theater = request.body.theatre_id;
    var movie = request.body.movie_id;
    
    var statement = 
        `insert into shows values(${id}, '${show_date}','${time}','${screen}','${theater}','${movie}')`;

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

app.put("/:show_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

  
    var id = request.params.show_id;
    var show_date = request.body.date;
    var startTime = request.body.start_time;
    var screenId =request.body.screen_id;
    var theatreId = request.body.theatre_id;
    var movieId = request.body.movie_id;
    

    var statement = 
        `update shows set date='${show_date}',start_time='${startTime}',screen_id='${screenId}',theatre_id='${theatreId}',movie_id='${movieId}' where show_id =${id}`;

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

app.delete("/:show_id", (request, response)=>{
    var connection = mysql.createConnection(connectionDetails);

    var id = request.params.show_id;
  
    var statement = 
        `delete from shows where show_id =${id}`;

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
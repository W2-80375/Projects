const mysql = require('mysql');
const express = require('express');
const config = require('config');

const app =  express.Router();

let connectionDetails = {
                          host: config.get("SERVER"),
                          database: config.get("DATABASE"),
                          user: config.get("USER"),
                          password: config.get("PASSWORD"),
                        }

app.get("/", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let statement = "select * from movies";

    connection.query(statement, (error, result)=>{
        if(error ==null)
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
app.get("/:movie_id", (request, response) => {
    const movieId = request.params.movie_id;
    let connection = mysql.createConnection(connectionDetails);
  
    const statement = "SELECT * FROM movies WHERE movie_id = ?";
  
    connection.query(statement, [movieId], (error, result) => {
      if (error == null) {
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(result));
      } else {
        response.setHeader("Content-Type", "application/json");
        response.send(JSON.stringify(error));
      }
  
      connection.end();
    });
  });

app.post("/", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let {title, description, duration, language, release_date,image} = request.body;   
    
    let statement = 
        `insert into movies (title, description, duration, language, release_date,image) values('${title}','${description}','${duration}','${language}','${release_date}','${image}')`;

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

app.put("/:movie_id", (request, response)=>{
  let connection = mysql.createConnection(connectionDetails);
  let id = request.params.movie_id;
 
  let {title, description, duration, language, release_date,image } = request.body;  
  const formattedReleaseDate = release_date ? release_date.substring(0, 10) : null;


  let statement = 
      `update movies set title='${title}',description='${description}',duration='${duration}',language='${language}',release_date='${formattedReleaseDate}',image='${image}' where movie_id =${id}`;

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

// app.put("/:movie_id", (request, response)=>{
//     let connection = mysql.createConnection(connectionDetails);
   
//     let { movie_id, title, description, duration, language, release_date } = request.body;   
  
//     let statement = 
//         `update movies set title='${title}',description='${description}',duration='${duration}',language='${language}',release_date='${release_date}' where movie_id =${movie_id}`;

//     connection.query(statement, (error, result)=>{
//         if(error==null)
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(result));
//             connection.end();
//             response.end();
//         }
//         else
//         {
//             response.setHeader("Content-Type", "application/json");
//             response.write(JSON.stringify(error));
//             connection.end();
//             response.end();
//         }
//     })
// });
app.delete("/:movie_id", (request, response)=>{
    let connection = mysql.createConnection(connectionDetails);

    let id = request.params.movie_id;
  
    let statement = 
        `delete from movies where movie_id =${id}`;

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
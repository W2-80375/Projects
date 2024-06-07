const express = require('express');
const mysql = require("mysql");
const config = require('config');
const app = express.Router();

const connection = mysql.createConnection({
    host: config.get("SERVER"),
    database: config.get("DATABASE"),
    user: config.get("USER"),
    password: config.get("PASSWORD"),
})

app.post("/", (req, res)=>{
      let {password, mob_no} = req.body;

      connection.query(
        `select * from users where mob_no = ?`,[mob_no],(error,result)=>{
            if(error){
                console.error(error)
                return res.status(500).json({error: "Internal server error"})
            }

            if(result.length === 0) {
                return res.status(404).json({error: "phone number is not found"})
            }
        }
      )
      
      connection.query(
        `update users set password = ? where mob_no = ? ` ,[password,mob_no],(error)=>{
            if(error){
                console.error(error)
                return res.status(500).json({error: "Internal server error"})
            
            }
            return res.status(200).json({messege: "password update successfully"})
        }
      )
})

module.exports = app;
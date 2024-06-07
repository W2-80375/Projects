const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  const sql = "select t.theatre_name,t.address,t.total_seats,t.rating,m.title from theaters t inner join movies m where t.movie_id = m.movie_id;"
  db.query(sql, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get("/theater/:movie_id", (request, response) => {
  const sql = "SELECT * FROM theaters WHERE movie_id=?"
  db.query(sql, [request.params.movie_id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


module.exports = router
const express = require("express")
const db = require("../database/db")
const utils = require("../utils")

const router = express.Router()

router.get("/", (request, response) => {
  const sql = "SELECT * FROM movies"
  db.query(sql, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post("/review", (request, response) => {
  const { movie_id,review,rating,id } = request.body
  const sql =
    "INSERT INTO reviews(movie_id,review,rating,id) VALUES(?,?,?,?)"
  db.query(sql, [movie_id, review, rating, id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.get("/review/:id", (request, response) => {
  const sql = "SELECT * FROM reviews WHERE id=?"
  db.query(sql, [request.params.id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post("/moviereview", (request, response) => {
  const { movie_id, id } = request.body
  const sql = "SELECT * FROM reviews WHERE movie_id=? AND id=?"
  db.query(sql, [movie_id, id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.put("/review", (request, response) => {
  const { review_id, review, rating } = request.body
  const sql = "UPDATE reviews SET review = ?,rating = ? WHERE review_id = ?"
  db.query(sql, [review, rating, review_id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.delete("/review/:id", (request, response) => {
  const sql = "DELETE FROM reviews WHERE review_id = ?"
  db.query(sql, [request.params.id], (error, data) => {
    response.send(utils.createResult(error, data))
  })
})
module.exports = router

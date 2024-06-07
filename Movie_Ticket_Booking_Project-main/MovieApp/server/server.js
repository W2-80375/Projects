const express = require("express")
const cors = require("cors")
const app = express()
const userRouter = require("./router/user")
const movieRouter = require("./router/movie")
const shareRouter = require("./router/share")
const theaterRouter = require("./router/theater")


app.use(cors("*"))
app.use(express.json())
app.use(express.static("uploads"))

app.use("/user", userRouter)
app.use("/movie", movieRouter)
app.use("/share", shareRouter)
app.use("/theater", theaterRouter)




app.listen(3000, "0.0.0.0", () => {
  console.log("Server started on port 3000")
})

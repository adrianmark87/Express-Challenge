require("dotenv").config();

const express = require("express");

const app = express();

const {hashPassword, verifyPassword, verifyToken, verifyTokenById} = require('./auth.js')

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", verifyToken,movieHandlers.updateMovie);
app.delete("/api/movies/:id", verifyToken,movieHandlers.deleteMovie);

const userHandlers = require("./userHandlers");

app.post('/api/login', userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users",hashPassword, userHandlers.postUser);
app.put("/api/users/:id",verifyToken, verifyTokenById,hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id",verifyToken, verifyTokenById,userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

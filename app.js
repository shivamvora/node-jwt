require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const mainRouter = require("./routes/main");

// middleware
app.use(express.static("./public"));

// express body parser
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}/...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

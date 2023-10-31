require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./docs/docs.json");
const notesRouter = require("./routes/notesRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUI.serve);
app.get("/api/docs", swaggerUI.setup(apiDocs));

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

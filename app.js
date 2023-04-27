const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./docs/docs.json');

const notesRouter = require("./routes/notesRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use('/api/docs', swaggerUI.serve);
app.get('/api/docs', swaggerUI.setup(apiDocs));

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Server started");
});

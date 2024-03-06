const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();
const {
   usersRouter,
   authRouter,
   boardsRouter,
   columnsRouter,
   cardsRouter,
} = require("./routes");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
   res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
   const { status = 500, message = "Server error" } = err;
   res.status(status).json({ message });
});

module.exports = app;

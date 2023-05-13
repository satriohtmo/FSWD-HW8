const express = require("express");
const app = express();
const port = 3000;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API With Swagger",
      version: "0.1.0",
      description: "API application Express And Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

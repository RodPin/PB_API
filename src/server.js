const express = require("express");
const cors = require("cors");
const { port } = require("../appConfig");

const app = express();

app.use(
  express.json({
    type: "*/*", // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
  })
);
app.use(cors());

require("./controllers")(app);

app.listen(port, () => console.log(`Server running on PORT:${port}`));

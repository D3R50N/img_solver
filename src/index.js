const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const config = require("../config");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(config.PORT, () => {
  console.clear();
    console.log(`
Server started!
Listening on http://localhost:${config.PORT}
`);
});

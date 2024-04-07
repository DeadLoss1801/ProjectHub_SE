const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
const router = require("./router");

app.use('/api', router);

app.listen(8000, () => {
    console.log("http://localhost:8000/");
});
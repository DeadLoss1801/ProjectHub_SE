const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use('/api', router);

app.listen(8000, () => {
    console.log("http://localhost:8000/");
});
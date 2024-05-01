const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
dotenv.config();
const PORT = process.env.PORT || 4000;

//databse call
connectDb();

// midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors())

//user routes
app.use("/api", require("./routs/rout"));


//api not found error
app.use((req, res) => {
  res.send({
    status: false,
    message: "Api rout not found",
    error: "not found"
  })
});

// error handleing
app.use((err, req, res) => {
  console.log(err);
  res.send({
    status: false,
    message: "Got server error",
    error: err.message
  })
});

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

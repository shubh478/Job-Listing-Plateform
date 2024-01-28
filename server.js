require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//create a server
const app = express();
// app.get("/",(req,res)=>{
//     console.log("Hi we are in out / route");
//     res.json({message: "Hey, how are you?"});
// })
// connect to db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Db connected!"))
  .catch((error) => console.log("failed to connect", error));
// health api
app.get("/health", (req, res) => {
  res.json({
    servive: "job listing server",
    status: "Active",
    time: new Date(),
  });
});
app.post("/post", (req, res) => {
  res.json({});
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

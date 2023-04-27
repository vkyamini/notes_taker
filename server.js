//All he packages required
const express = require("express");
// gets the files from controller path
const allRoutes = require("./controllers");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Acess all the routes from the folder
app.use(allRoutes);

app.listen(PORT,()=>{
    console.log("listening on port" +PORT)
})
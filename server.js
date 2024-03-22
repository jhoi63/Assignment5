/*********************************************************************************
*  WEB700 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Luzaline Joy Tirona Student ID: 174 223 214 Date: March 22, 2024
*
*  Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const data = require("./modules/officeData.js");
const { application } = require("express");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;


app.engine('.hbs', exphbs.engine ({
    defaultLayout: 'main', 
    extname: '.hbs',
}));


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');

app.get("/employees/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.post("/employees/add", (req, res) => {
    data.addEmployee(req.body).then(()=>{
        res.redirect("/employees");
    });
});

app.get("/employees", (req, res) => {
    data.getAllEmployees().then((data) => {
        res.render("employees", {employees: data});
    }).catch((err) => {
        res.render("employees", {message: "no results"});
    });
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/description", function(req, res) {
    res.render("description");
});

app.get("/PartTimer", (req,res) => {
    data.getPartTimers().then((data)=>{
        res.json(data);
    });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
});

data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});


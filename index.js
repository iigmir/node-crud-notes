import express from "express";
import mysql from "mysql";
// Routes
import DbRoutes from "./api/db.js";
import UsersRoutes from "./api/users.js";

const server = express();
const port = 3000;

const connection = mysql.createConnection({
    host     : "localhost",
    user     : "my_admin",
    password : "secret",
    database : "my_test"
});
connection.connect();

server.use("/api/users", UsersRoutes(connection) );
server.use("/api/db", DbRoutes(connection) );

server.get("/", (req, res) => {
    res.jsonp({ message: "Hello World" });
});

server.listen( port, () => {
    console.log(`Link: http://127.0.0.1:${port}`);
});

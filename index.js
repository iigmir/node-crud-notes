import express from "express";
import mysql from "mysql";
import BodyParser from "body-parser";
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

const RootRoute = (req, res) => { res.jsonp({ message: "Hello World" }); };

server.use(BodyParser.urlencoded({ extended: false }));
server.use(BodyParser.json());

server.use("/", express.static("static"));
server.get("/api/", RootRoute);
server.use("/api/db", DbRoutes(connection) );
server.use("/api/users", UsersRoutes(connection) );

server.listen( port, () => {
    console.log(`Link: http://127.0.0.1:${port}`);
});

import express from "express";

function get_act(connection) {
    return (req, res) => {
        connection.query("SELECT 1 + 1 AS solution", (error, results, fields) => {
            if (error) { throw error; }
            res.jsonp({ solution: results[0].solution });
        });
    };
}

export default connection => express.Router().get( "/", get_act(connection) );

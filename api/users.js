import express from "express";
import QuerySingleUser from "./utils/QuerySingleUser.js";

const generate_gender = (input = 0) => {
    switch (input) {
        case 1: return "male";
        case 2: return "female";
        default: return "non-binary";
    }
};

/**
 * @param {import("mysql").Connection} connection
 * @returns
 */
const get_action = connection => (req, res) => {
    /**
     * @param {express.Request} error
     * @param {express.Response} results
     * @param {*} fields
     */
    const cb = function (error, results, fields) {
        if (error) throw error;
        const users = results.map( ({ gender, ...rest }) => ({ gender: generate_gender(gender), ...rest }) );
        res.jsonp(users);
    };
    connection.query( "SELECT name, gender, birthdate FROM `my_hw`", cb );
};

/**
 * @param {import("mysql").Connection} connection
 * @returns
 */
const post_action = (connection) => {
    return (req, res) => {
        const { name, birthdate, gender, address } = req.body;
        const check_command = `SELECT COUNT(id) AS length FROM my_hw WHERE name="${name}";`;
        const success_action = (error, results) => {
            if (error) {
                // throw error
                res.statusCode = 400;
                res.jsonp({ message: "Error", payload: error });
                return;
            };
            res.statusCode = 200;
            res.jsonp({ message: "Success", payload: results });
            return;
        };
        connection.query( check_command, (error, user) => {
            if (error) {
                res.statusCode = 400;
                res.jsonp({ message: "Error", payload: error });
                return;
            };
            if( user[0].length < 1 ) {
                const get_insert_command = (name, birthdate, gender, address) => {
                    const action = "INSERT INTO `my_hw` (`id`, `name`, `birthdate`, `gender`, `address`) ";
                    const values = `VALUES (NULL, "${name}", "${birthdate}", ${gender}, "${address}")`;
                    return action + values;
                };
                const insert_command = get_insert_command(name, birthdate, gender, address);
                connection.query(insert_command, success_action);
                return;
            }
            res.statusCode = 400;
            res.jsonp({ message: "User existed", payload: user });
        });
    };
}

// Single user (/api/users/:user) section

const get_user_action = (connection) => {
    return (req, res) => {
        const ajax = new QuerySingleUser(connection, req.params.user);
        ajax.get_user_by_name(req.params.user).then( (results) => {
            res.statusCode = results.code;
            res.jsonp(results);
        }).catch( (e) => {
            res.statusCode = e.code;
            res.jsonp( e );
        });
    };
}

function put_user_action(connection) {
    return (req, res) => {
        const datas = {
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            address: req.body.address,
        };
        const ajax = new QuerySingleUser(connection, req.params.user);
        ajax.get_user_by_name(req.params.user).then( (results) => {
            res.statusCode = results.code;
            res.jsonp( ajax.put_user(datas) );
        }).catch( (error) => {
            res.statusCode = error.code;
            res.jsonp( error );
        });
    };
}

function delete_user_action(connection) {
    return (req, res) => {
        const datas = {
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            address: req.body.address,
        };
        const ajax = new QuerySingleUser(connection, req.params.user);
        ajax.get_user_by_name(req.params.user).then( (results) => {
            res.statusCode = results.code;
            res.jsonp( ajax.put_user(datas) );
        }).catch( (e) => {
            res.statusCode = e.code;
            res.jsonp( e );
        });
    };
}

/**
 * @param {import("mysql").Connection} connection
 * @returns
 */
export default connection => express.Router()
    .get( "/", get_action(connection) )
    .post( "/", post_action(connection) )
    .get( "/:user", get_user_action(connection) )
    .put( "/:user", put_user_action(connection) )
    .delete( "/:user", delete_user_action(connection) )
;


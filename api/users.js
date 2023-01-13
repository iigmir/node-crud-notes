import express from "express";

const get_action = connection => (req, res) => {
    /**
     * @param {express.Request} error
     * @param {express.Response} results
     * @param {*} fields
     */
    const cb = function (error, results, fields) {
        if (error)
            throw error;
        const generate_gender = (input = 0) => {
            switch (input) {
                case 1: return "male";
                case 2: return "female";
                default: return "non-binary";
            }
        };
        const users = results.map( ({ gender, ...rest }) => ({ gender: generate_gender(gender), ...rest }) );
        res.jsonp(users);
    };
    connection.query( "SELECT name, gender, birthdate FROM `my_hw`", cb );
};

const post_action = (connection) => {
    return (req, res) => {
        const get_command = (name, birthdate, gender, address) => {
            const action = "INSERT INTO `my_hw` (`id`, `name`, `birthdate`, `gender`, `address`) ";
            const values = `VALUES (NULL, "${name}", "${birthdate}", ${gender}, "${address}")`;
            return action + values;
        };
        const { name, birthdate, gender, address } = req.body;
        const command = get_command(name, birthdate, gender, address);
        connection.query(command, (error, results) => {
            if (error) {
                // throw error
                res.statusCode = 400;
                res.jsonp({ message: "Error", payload: error });
                return;
            };
            res.statusCode = 200;
            res.jsonp({ message: "Success", payload: results });
            return;
        });
    };
}

export default connection => express.Router()
    .get( "/", get_action(connection) )
    .post( "/", post_action(connection) )
;

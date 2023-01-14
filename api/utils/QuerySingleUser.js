/**
 * @typedef {Object} QsuResponseInterface
 * @property {String} message Response message
 * @property {Number} code HTTP status code
 * @property {Object|Array|null} data Response datas
 */

class QuerySingleUser {
    /**
     * @param {import("mysql").Connection} connection
     * @param {String} name
     */
    constructor(connection = null, name = "") {
        this.connection = connection;
        this.name = name;
        this.data = [];
    }
    /**
     * Generate interface
     * @param {String} message Response message
     * @param {Number} code HTTP status code
     * @param {Object|Array} data Response datas
     * @returns {QsuResponseInterface} Response interface.
    */
    generate_response(code = 500, message = "Error message", results = []) {
        return { message, code, results };
    }
    generate_gender_request(input = "non-binary") {
        switch (input) {
            case 1:
            case "1":
            case "male":
                return 1;
            case 2:
            case "2":
            case "female":
                return 2;
            default: return 0;
        }
    }
    generate_gender_response(input = 0) {
        switch (input) {
            case 1: return "male";
            case 2: return "female";
            default: return "non-binary";
        }
    }
    get_user_by_name(input = "") {
        const user = input ?? this.name;
        return new Promise( (resolve, reject) => {
            if( this.connection == null ) {
                reject(this.connection);
                return;
            }
            this.connection.query(`SELECT * FROM my_hw WHERE name="${user}"`, (error, results, fields) => {
                if (error) {
                    reject( this.generate_response( 500, "Unknown error", error ) );
                }
                if(results.length < 1) {
                    reject( this.generate_response( 404, "Not found", error ) );
                }
                const users = results.map(({ gender, ...rest }) => ({ gender: this.generate_gender_response(gender), ...rest }));
                this.data = users;
                resolve( this.generate_response( 200, "OK", this.data ) );
            });
        });
    }
}

export default QuerySingleUser;

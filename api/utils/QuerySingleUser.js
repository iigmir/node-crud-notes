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
        this.db = `my_hw`;
    }
    /**
     * Generate interface
     * @param {String} message Response message
     * @param {Number} code HTTP status code
     * @param {Object|Array|null} data Response datas
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
            const command = `SELECT * FROM ${this.db} WHERE name="${user}"`;
            this.connection.query(command, (error, results, fields) => {
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
    put_user({ gender = 0, birthdate = null, address = null, }) {
        const generate_params = ({ gender = 0, birthdate = null, address = null, id = 0 }) => {
            const params = {
                id: id,
                gender: this.generate_gender_request(gender),
                birthdate: birthdate,
                address: address,
            };
            return params;
        };
        /**
         * Generate sth like this:
         *
         * ```sql
         * UPDATE database SET `name` = 'name', `birthdate` = 'birthdate', `gender` = 'gender', `address` = 'address' WHERE database.`id` = 'id'
         * ```
         */
        const generate_command = (item = {}) => {
            const not_id_or_name = (property = "id") => ["id", "name"].includes(property) === false;
            const conditions = ([property, value]) => value != null && not_id_or_name(property);
            const item_command = ([property, value]) => `\`${property}\` = ${value}`;
            const map_array = Object.entries( item ).filter( conditions );
            const commands = map_array.map( item_command ).join( "," );
            const result = `UPDATE ${this.db} SET ${commands} WHERE ${this.db}.id = ${item.id}`;
            return result;
        };
        return new Promise( (resolve, reject) => {
            this.get_user_by_name(this.name).then( (datas) => {
                const id = datas.results[0].id ?? null;
                const command = generate_command( generate_params({ gender, birthdate, address, id }) );
                this.connection.query( command, (error, result) => {
                    if (error) {
                        reject( this.generate_response( 500, "Unknown error when updating data", error ) );
                    }
                    resolve( this.generate_response( 200, "OK", result ) );
                });
            }).catch( e => reject(e) );
        });
    }
    delete_user() {
        return new Promise( (resolve, reject) => {
            const generate_command = (id = null) => {
                return `DELETE FROM ${this.db} WHERE ${this.db}.\`id\` = ${id}`;
            };
            this.get_user_by_name(this.name).then( (datas) => {
                const command = generate_command( datas.results[0]?.id );
                this.connection.query( command, (error, result) => {
                    if (error) {
                        reject( this.generate_response( 500, "Unknown error when updating data", error ) );
                    }
                    resolve( this.generate_response( 200, "OK", result ) );
                });
            }).catch( e => reject(e) );
        });
    }
}

export default QuerySingleUser;



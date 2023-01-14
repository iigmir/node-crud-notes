class QuerySingleUser {
    /**
     * @param {import("mysql").Connection} connection
     * @param {String} name
     */
    constructor(connection, name = "") {
        this.connection = connection;
        this.name = name;
        this.data = [];
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
            this.connection.query(`SELECT * FROM my_hw WHERE name="${user}"`, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                this.data = results;
                resolve( this.data );
            });
        });
    }
}

export default QuerySingleUser;

"use script";

export default dbconfig();

function dbconfig() {
    console.log('Environment : ' + process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case "local":
            return {
                sql: {
                    host: "localhost",
                    database: "pauls_fashion",
                    username: "root",
                    password: "root",
                    dialect: "mysql",
                    logging: true,
                    maxConcurrentQueries: 1000,
                    omitNull: true,
                    native: true,
                    language: "en"
                }
            };
        case "production":
            return {
                sql: {
                    host: "localhost",
                    database: "pauls_fashion",
                    username: "root",
                    password: "",
                    dialect: "mysql",
                    logging: true,
                    maxConcurrentQueries: 1000,
                    omitNull: true,
                    native: true,
                    language: "en",
                    dialectOptions: {
                        option: {
                            requestTimeout: 120000
                        }
                    }
                }
            };
        // case "development":
        //     return {
        //         sql: {
        //             host: "aladdin.ctulcdg1qd6a.ap-south-1.rds.amazonaws.com",
        //             database: "home_service_app",
        //             username: "aladdin",
        //             password: "Aladdin21",
        //             dialect: "mysql",
        //             logging: true,
        //             maxConcurrentQueries: 1000,
        //             omitNull: true,
        //             native: true,
        //             language: "en",
        //             dialectOptions: {
        //                 option: {
        //                     requestTimeout: 120000
        //                 }
        //             }
        //         }
        //     };
        default:
            return {
                sql: {
                    host: "localhost",
                    database: "pauls_fashion",
                    username: "root",
                    password: "12345",
                    dialect: "mysql",
                    logging: true,
                    maxConcurrentQueries: 1000,
                    omitNull: true,
                    native: true,
                    language: "en"
                }
            };
    }
}
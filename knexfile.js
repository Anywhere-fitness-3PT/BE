
require ('dotenv').config()
module.exports = {
    development: {
        client: 'pg',

        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
        },
        migrations: {

          directory: "./database/migrations",

        },
        seeds: {
            directory: "./database/seeds",
        }
    },
    test: {
        client: "pg",
        connection: process.env.DB_URL,
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds/test",
        },
    },
    production: {
        client: "pg",
        connection: {
            host : process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
        },
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
};

require('dotenv').config()

module.exports = {
    development: {
        client: "pg",
        useNullAsDefault: true,
        connection: process.env.DB_URL,
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
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
        connection: process.env.DB_URL,
        migrations: {
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
};


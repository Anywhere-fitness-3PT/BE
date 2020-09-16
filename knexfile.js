module.exports = {
    development: {
        client: "pg",
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        migrations: {
            tableName: "knex_migrations",
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds",
        },
    },
    test: {
        client: "pg",
        connection: process.env.DB_TEST,
        migrations: {
            tableName: "knex_migrations",
            directory: "./database/migrations",
        },
        seeds: {
            directory: "./database/seeds/test",
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            tableName: "knex_migrations",
            directory: "./database/migrations",
        },
        seeds: {
            directpry: "./database/seeds",
        },
    },
};


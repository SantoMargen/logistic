module.exports =
{
    "development": {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DB,
        "host": "postgres",
        "dialect": "postgres"
    },
    "test": {
        "username": process.env.POSTGRES_USER,
        "password": process.env.POSTGRES_PASSWORD,
        "database": process.env.POSTGRES_TEST,
        "host": process.env.DB__HOST_TEST,
        "dialect": "postgres"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
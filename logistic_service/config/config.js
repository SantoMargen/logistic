module.exports =
{
    "development": {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_DB,
        "host": "postgres_logistic",
        "dialect": "postgres"
    },
    "test": {
        "username": process.env.PG_USER,
        "password": process.env.PG_PASSWORD,
        "database": process.env.PG_TEST,
        "host": "postgres_logistic",
        "dialect": "postgres_logistic"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
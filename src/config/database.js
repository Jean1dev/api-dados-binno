const PROD = {
    dialect: 'postgres',
    host: process.env.HOST_DB || 'localhost',
    username: process.env.USERNAME_DB || 'jeanfernandes',
    password: process.env.PASSWD_DB || 'admin',
    database: process.env.DB_NAME || 'binno_db',
    ssl: process.env.SSL_CONNECTION ? true : false,
    dialectOptions: {
        ssl: process.env.SSL_CONNECTION ? true : false,
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}

module.exports = PROD
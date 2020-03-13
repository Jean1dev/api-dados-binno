const PROD = {
    dialect: 'postgres',
    host: process.env.HOST_DB || 'localhost',
    username: process.env.USERNAME_DB || 'jeanfernandes',
    password: process.env.PASSWD_DB || 'admin',
    database: process.env.DB_NAME || 'binno_db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}

module.exports = PROD
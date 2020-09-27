/* models are cached in node.js, so should only be one connection to sql db */
/* connects to db and defines models/tables */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // SQLITE  ONLY 
    storage: 'database.sqlite',
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    
        console.log('Connection to the database has been established successfully.');
      }
      catch (e) {
        console.error(e);
        process.exit(-1);
      }
})();

module.exports = sequelize;
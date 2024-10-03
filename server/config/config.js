module.exports = {
    development: {
      username: 'postgres',
      password: 'admin123',
      database: 'Roxana',
      host: 'localhost',
      dialect: 'postgres', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
    },
    test: {
      // ... test configuration
    },
    production: {
      // ... production configuration
    }
  };
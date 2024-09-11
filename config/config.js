require('dotenv').config(); // للتأكد من تحميل متغيرات البيئة من ملف .env

module.exports = {
  development: {
    username: 'admin',
    password: process.env.DB_PASSWORD,  // استخدام متغيرات البيئة
    database: 'educreativedb',
    port: 3306,
    host: 'educreative-db.cpcuwyeckurv.eu-north-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 100000  // تعيين المهلة إلى 60 ثانية
    }
  },
  test: {
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'database_test',
    host: 'educreative-db.cpcuwyeckurv.eu-north-1.rds.amazonaws.com',
    dialect: 'mysql'
  },
  production: {
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'database_production',
    host: 'educreative-db.cpcuwyeckurv.eu-north-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000
    }
  }
};

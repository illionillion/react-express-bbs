const mysql = require("mysql2/promise");

// 接続プールの作成
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // 同時接続数の制限
});

// 接続を取得する関数
const mysqlConnection = async () => {
  return await pool.getConnection();
};

module.exports = mysqlConnection;
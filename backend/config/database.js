import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Database Config:');
console.log(`   Host: ${process.env.DB_HOST || '13.53.137.119'}`);
console.log(`   User: ${process.env.DB_USER || 'root'}`);
console.log(`   Database: ${process.env.DB_NAME || 'happy_tails'}`);
console.log(`   Port: ${process.env.DB_PORT || 3306}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST || '13.53.137.119',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'happy_tails',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

pool.on('error', (err) => {
  console.error('❌ MySQL Pool Error:', err.message);
});

export default pool;

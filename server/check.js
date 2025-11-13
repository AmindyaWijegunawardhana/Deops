#!/usr/bin/env node

/**
 * Database & Server Troubleshooting Script
 * Run this to check if your MySQL database and server are properly configured
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

console.log('\n🔍 Happy Tails - Troubleshooting Checker\n');
console.log('=' .repeat(50));

// Check 1: Environment file exists
console.log('\n✓ Checking .env file...');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('  ✓ .env file found');
} else {
  console.log('  ✗ .env file NOT found!');
  console.log('  → Copy .env.example to .env and update your credentials');
  process.exit(1);
}

// Check 2: Environment variables loaded
console.log('\n✓ Checking environment variables...');
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'SERVER_PORT'];
let allVarsFound = true;

requiredVars.forEach(variable => {
  if (process.env[variable]) {
    console.log(`  ✓ ${variable} = ${variable === 'DB_PASSWORD' ? '***' : process.env[variable]}`);
  } else {
    console.log(`  ✗ ${variable} is NOT set`);
    allVarsFound = false;
  }
});

if (!allVarsFound) {
  console.log('\n→ Make sure all required environment variables are set in .env');
  process.exit(1);
}

// Check 3: Test MySQL Connection
console.log('\n✓ Testing MySQL connection...');
try {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  console.log(`  ✓ Connected to ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log(`  ✓ Using database: ${process.env.DB_NAME}`);

  // Check if tables exist
  const [tables] = await connection.execute('SHOW TABLES');
  console.log(`  ✓ Found ${tables.length} table(s)`);

  if (tables.length === 0) {
    console.log('\n⚠️  No tables found! Run this SQL script first:');
    console.log('     mysql -u root -p < database/schema.sql');
  } else {
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`     - ${tableName}`);
    });
  }

  await connection.end();

} catch (error) {
  console.log(`\n  ✗ MySQL Connection Error: ${error.message}`);
  console.log('\n  Common solutions:');
  console.log('  1. Is MySQL Server running?');
  console.log(`     - Check if MySQL is running on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  console.log('\n  2. Check your credentials in .env:');
  console.log(`     - DB_USER: ${process.env.DB_USER}`);
  console.log(`     - DB_HOST: ${process.env.DB_HOST}`);
  console.log(`     - DB_PORT: ${process.env.DB_PORT}`);
  console.log(`     - DB_NAME: ${process.env.DB_NAME}`);
  console.log('\n  3. If error says "Access denied"');
  console.log('     - Verify your MySQL password is correct in .env');
  console.log('     - Try connecting manually: mysql -u root -p');
  process.exit(1);
}

console.log('\n' + '='.repeat(50));
console.log('✓ All checks passed!');
console.log('\nYou can now run: npm run dev\n');

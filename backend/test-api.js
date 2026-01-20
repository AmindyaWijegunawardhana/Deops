#!/usr/bin/env node

/**
 * Quick Test Script
 * Tests the API endpoints directly
 */

const BASE_URL = 'http://localhost:5000/api';

async function test() {
  console.log('\n🧪 Testing Happy Tails API\n');
  console.log('='.repeat(50));

  // Test 1: Health Check
  console.log('\n1️⃣  Testing Health Check...');
  try {
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, data);
    if (response.ok) {
      console.log('   ✅ Health check passed!');
    } else {
      console.log('   ⚠️  Health check failed - check MySQL connection');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    console.log('   → Is the server running? (npm run dev)');
    return;
  }

  // Test 2: Signup
  console.log('\n2️⃣  Testing Signup...');
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        confirmPassword: 'password123'
      })
    });
    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Response:`, data);
    if (response.ok) {
      console.log('   ✅ Signup works!');
    } else {
      console.log(`   ⚠️  Signup failed: ${data.message}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

test();

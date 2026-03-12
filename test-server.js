#!/usr/bin/env node

// Simple test script to verify the GitHub MCP server functionality
const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing GitHub MCP Server...\n');

// Check if main entry point exists
const mainFile = path.join(__dirname, 'index.js');
const fs = require('fs');

if (!fs.existsSync(mainFile)) {
  console.error('❌ Main entry point not found at index.js');
  process.exit(1);
}

console.log('✅ Server file found');

// Test environment variables
if (!process.env.GITHUB_TOKEN) {
  console.warn('⚠️  GITHUB_TOKEN environment variable not set');
  console.log('   Please set your GitHub Personal Access Token:');
  console.log('   export GITHUB_TOKEN=your_token_here\n');
}

// Try to start the server briefly to check for syntax errors
console.log('🚀 Testing server startup...');

const serverProcess = spawn('node', [mainFile], {
  env: { ...process.env, GITHUB_TOKEN: process.env.GITHUB_TOKEN || 'test_token' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';
let errorOutput = '';

serverProcess.stdout.on('data', (data) => {
  output += data.toString();
});

serverProcess.stderr.on('data', (data) => {
  errorOutput += data.toString();
});

// Kill the server after 3 seconds
setTimeout(() => {
  serverProcess.kill('SIGTERM');
}, 3000);

serverProcess.on('close', (code) => {
  if (code === null || code === 0 || code === 15) { // SIGTERM
    console.log('✅ Server started successfully');
    if (output) {
      console.log('📝 Server output:');
      console.log(output);
    }
  } else {
    console.error('❌ Server failed to start');
    if (errorOutput) {
      console.error('Error output:');
      console.error(errorOutput);
    }
  }
  
  console.log('\n🎉 Test completed!');
  console.log('\nNext steps:');
  console.log('1. Set your GitHub token: export GITHUB_TOKEN=your_token_here');
  console.log('2. Start the server: npm start');
  console.log('3. The server will be available for MCP clients to connect to');
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start server process:', error.message);
});
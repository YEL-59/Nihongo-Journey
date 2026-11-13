#!/usr/bin/env node

/**
 * 1-Command Sync Framework to Any Project (e.g. door)
 * Usage: node scripts/sync.js "C:\Users\Tofayel\Desktop\door"
 */

const path = require('path');
const readline = require('readline');
const { syncTo } = require('./sync-core');

const rootDir = path.resolve(__dirname, '..');
let targetDir = process.argv[2];

if (!targetDir) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter target project path (e.g. C:\\Users\\Tofayel\\Desktop\\door): ', (ans) => {
    rl.close();
    targetDir = ans.trim();
    if (!targetDir) {
      console.log('No path provided. Exiting.');
      process.exit(1);
    }
    executeSync(targetDir);
  });
} else {
  executeSync(targetDir);
}

function executeSync(target) {
  console.log('===========================================================');
  console.log(`  Syncing EasyTemplate Framework -> ${target}`);
  console.log('===========================================================');
  try {
    syncTo(rootDir, target);
    console.log('\n\x1b[32m✓ Framework successfully synced!\x1b[0m');
    console.log('You can now open the target project and run:\n  npm run settings\n');
  } catch (err) {
    console.error(`\n\x1b[31mError syncing:\x1b[0m ${err.message}\n`);
    process.exit(1);
  }
}

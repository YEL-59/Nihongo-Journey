#!/usr/bin/env node

/**
 * EasyTemplate Interactive Settings CLI
 * Allows developers to configure Language (English / Bangla),
 * Execution Strategy, and view system status with 1-key press.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rootDir = path.resolve(__dirname, '..');
const settingsPath = path.join(rootDir, 'settings.json');
const configPath = path.join(rootDir, 'project.config.md');
const memoryPath = path.join(rootDir, 'planning', 'MEMORY.md');
const statusPath = path.join(rootDir, 'PROJECT_STATUS.md');

function loadSettings() {
  const defaultSettings = {
    language: 'en',
    executionStrategy: 'FRONTEND_FIRST',
    memoryTracking: true,
    autoBuildVerification: true,
    antiRegression: true,
    version: '1.1.0'
  };

  if (!fs.existsSync(settingsPath)) {
    saveSettings(defaultSettings);
    return defaultSettings;
  }

  try {
    const raw = fs.readFileSync(settingsPath, 'utf-8');
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch (err) {
    return defaultSettings;
  }
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');

  // Also sync language to project.config.md if file exists
  if (fs.existsSync(configPath)) {
    try {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (configContent.includes('- **Language Preference**:')) {
        configContent = configContent.replace(
          /- \*\*Language Preference\*\*:.*/g,
          `- **Language Preference**: \`${settings.language.toUpperCase()}\` (${settings.language === 'en' ? 'English' : 'Bangla'})`
        );
      }
      if (configContent.includes('- **Active Strategy**:')) {
        configContent = configContent.replace(
          /- \*\*Active Strategy\*\*:.*/g,
          `- **Active Strategy**: \`${settings.executionStrategy}\``
        );
      }
      fs.writeFileSync(configPath, configContent, 'utf-8');
    } catch (err) {
      // ignore
    }
  }
}

function createRl() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function printHeader(settings) {
  const langDisplay = settings.language === 'bn' ? 'বাংলা (Bangla - bn)' : 'English (en)';
  console.clear ? console.clear() : console.log('\n---');
  console.log('===============================================================');
  console.log('       🛠️   EasyTemplate Project Settings & Configuration      ');
  console.log('===============================================================');
  console.log(`  🌐 Current Language  : \x1b[32m${langDisplay}\x1b[0m`);
  console.log(`  ⚡ Execution Strategy: \x1b[36m${settings.executionStrategy}\x1b[0m`);
  console.log(`  🧠 Memory Tracking   : \x1b[32m${settings.memoryTracking ? 'ACTIVE (Zero-State-Loss)' : 'DISABLED'}\x1b[0m`);
  console.log(`  🛡️ Anti-Regression   : \x1b[32m${settings.antiRegression ? 'ACTIVE (Phase 4 Safe)' : 'DISABLED'}\x1b[0m`);
  console.log('---------------------------------------------------------------');
  console.log('  [1] 🌐 Change Language (English / বাংলা)');
  console.log('  [2] ⚡ Change Execution Strategy (FRONTEND_FIRST / BOTH_FULLSTACK / BACKEND_FIRST)');
  console.log('  [3] 📝 Open Client Modification Guide (How to update/modify)');
  console.log('  [4] 🧠 View Current System State & Memory Snapshot');
  console.log('  [5] 🔄 Sync Framework to Another Project (e.g. C:\\Users\\Tofayel\\Desktop\\door)');
  console.log('  [0] 🚪 Exit');
  console.log('===============================================================');
}

function handleLanguageMenu(settings, callback) {
  const rl = createRl();
  console.log('\n--- 🌐 Select Language Preference ---');
  console.log('  [1] English (All AI prompt responses, task cards, and suggestions in English)');
  console.log('  [2] বাংলা   (সকল AI রেসপন্স, টাস্ক সমাপ্তি রিপোর্ট এবং পরবর্তী ধাপ বাংলায়)');
  console.log('  [b] Back to Main Menu');
  console.log('-------------------------------------');
  rl.question('Enter choice [1, 2, english, bangla]: ', (ans) => {
    rl.close();
    const clean = ans.trim().toLowerCase();
    if (clean === '1' || clean === 'english' || clean === 'en') {
      settings.language = 'en';
      saveSettings(settings);
      console.log('\n\x1b[32m✓ Language successfully set to: English (en)\x1b[0m');
      console.log('All AI responses, suggestion boxes, and task handoff cards will now be displayed in English.\n');
    } else if (clean === '2' || clean === 'bangla' || clean === 'bn' || clean === 'বাংলা') {
      settings.language = 'bn';
      saveSettings(settings);
      console.log('\n\x1b[32m✓ ভাষা সফলভাবে পরিবর্তিত হয়েছে: বাংলা (bn)\x1b[0m');
      console.log('সকল AI রেসপন্স, টাস্ক হ্যান্ডঅফ কার্ড এবং পরবর্তী সেশনের প্রম্পট বাংলায় প্রদর্শিত হবে।\n');
    } else {
      console.log('No change made.');
    }
    setTimeout(callback, 1200);
  });
}

function handleStrategyMenu(settings, callback) {
  const rl = createRl();
  console.log('\n--- ⚡ Select Execution Strategy ---');
  console.log('  [1] FRONTEND_FIRST (Screenshots & UI demo priority with mock data)');
  console.log('  [2] BOTH_FULLSTACK (Standard MERN concurrent - live DB & endpoints)');
  console.log('  [3] BACKEND_FIRST  (Database schemas, API endpoints, and validation first)');
  console.log('  [b] Back');
  console.log('------------------------------------');
  rl.question('Enter choice [1-3]: ', (ans) => {
    rl.close();
    const clean = ans.trim();
    if (clean === '1') {
      settings.executionStrategy = 'FRONTEND_FIRST';
    } else if (clean === '2') {
      settings.executionStrategy = 'BOTH_FULLSTACK';
    } else if (clean === '3') {
      settings.executionStrategy = 'BACKEND_FIRST';
    }
    saveSettings(settings);
    console.log(`\n\x1b[32m✓ Execution Strategy set to: ${settings.executionStrategy}\x1b[0m\n`);
    setTimeout(callback, 1200);
  });
}

function showMemorySnapshot(callback) {
  if (fs.existsSync(statusPath)) {
    const content = fs.readFileSync(statusPath, 'utf-8');
    console.log('\n--- 📊 Live Project Status & Module Checklist ---');
    console.log(content);
    console.log('-------------------------------------------------');
  } else if (fs.existsSync(memoryPath)) {
    const content = fs.readFileSync(memoryPath, 'utf-8');
    const lines = content.split('\n').slice(0, 35).join('\n');
    console.log('\n--- 🧠 Active System State Snapshot ---');
    console.log(lines);
    console.log('--------------------------------------');
  } else {
    console.log('\nNo PROJECT_STATUS.md or MEMORY.md file found.');
  }
  const rl = createRl();
  rl.question('\nPress Enter to return to menu...', () => {
    rl.close();
    callback();
  });
}

function showModificationGuide(callback) {
  console.log('\n--- 📝 How to Handle Client Modifications & Revisions ---');
  console.log('1. Put your update instructions into: inputs/client_docs/updates.md');
  console.log('   (Or paste your Telegram chat export: inputs/client_docs/telegram_chat.txt or messages.html)');
  console.log('2. If there are new screenshot images, upload them to: inputs/screenshots/');
  console.log('3. Open AI Chat and paste this 1-click prompt:');
  console.log('\x1b[33m');
  console.log('   Client requested updates/modifications. I have provided the details in:');
  console.log('   - Updates / Chat: inputs/client_docs/updates.md');
  console.log('   - New UI Screenshots: inputs/screenshots/');
  console.log('   Follow Phase 4 (Client Modification Protocol) in AGENTS.md:');
  console.log('   1. Read planning/MEMORY.md to protect existing working code.');
  console.log('   2. Execute the changes surgically without breaking existing code.');
  console.log('   3. Run npm run build to verify 0 errors.');
  console.log('\x1b[0m');
  console.log('---------------------------------------------------------');
  const rl = createRl();
  rl.question('\nPress Enter to return to menu...', () => {
    rl.close();
    callback();
  });
}

function handleSyncPrompt(callback) {
  const rl = createRl();
  console.log('\n--- 🔄 Sync EasyTemplate Framework to Another Project ---');
  rl.question('Enter target project path (e.g. C:\\Users\\Tofayel\\Desktop\\door): ', (target) => {
    rl.close();
    const cleanTarget = target.trim();
    if (!cleanTarget) {
      console.log('Cancelled.');
      setTimeout(callback, 1000);
      return;
    }

    try {
      const syncModule = require('./sync-core');
      syncModule.syncTo(rootDir, cleanTarget);
      console.log(`\n\x1b[32m✓ Successfully synced to: ${cleanTarget}\x1b[0m\n`);
    } catch (err) {
      console.log(`\nSync error: ${err.message}`);
    }
    setTimeout(callback, 2000);
  });
}

function mainMenu() {
  const settings = loadSettings();
  printHeader(settings);
  const rl = createRl();
  rl.question('Enter choice [0-5]: ', (choice) => {
    rl.close();
    const c = choice.trim();
    switch (c) {
      case '1':
        handleLanguageMenu(settings, mainMenu);
        break;
      case '2':
        handleStrategyMenu(settings, mainMenu);
        break;
      case '3':
        showModificationGuide(mainMenu);
        break;
      case '4':
        showMemorySnapshot(mainMenu);
        break;
      case '5':
        handleSyncPrompt(mainMenu);
        break;
      case '0':
      case 'exit':
      case 'q':
        console.log('\nGoodbye! Settings saved to settings.json.\n');
        process.exit(0);
        break;
      default:
        console.log('\nInvalid choice. Try again.');
        setTimeout(mainMenu, 1000);
    }
  });
}

// Support command-line direct flags:
// e.g. node scripts/settings.js --lang en
//      node scripts/settings.js --lang bn
const args = process.argv.slice(2);
if (args.length > 0) {
  const settings = loadSettings();
  if (args.includes('--lang') || args.includes('-l')) {
    const idx = args.findIndex(a => a === '--lang' || a === '-l');
    const val = (args[idx + 1] || '').toLowerCase();
    if (val === 'en' || val === 'english') {
      settings.language = 'en';
      saveSettings(settings);
      console.log('Language set to English (en).');
      process.exit(0);
    } else if (val === 'bn' || val === 'bangla') {
      settings.language = 'bn';
      saveSettings(settings);
      console.log('Language set to Bangla (bn).');
      process.exit(0);
    }
  }
}

// Start interactive menu
mainMenu();

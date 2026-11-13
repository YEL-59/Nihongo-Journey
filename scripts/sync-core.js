const fs = require('fs');
const path = require('path');

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) {
      fs.mkdirSync(dst, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.git' || entry === 'dist' || entry === '.next') continue;
      copyRecursive(path.join(src, entry), path.join(dst, entry));
    }
  } else {
    const parent = path.dirname(dst);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dst);
  }
}

function syncTo(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }

  // 1. Core Framework Files
  const coreFiles = [
    'settings.json',
    'AGENTS.md',
    'HOW_TO_USE_BN.md',
    'HOW_TO_USE_EN.md',
    'PROJECT_STRUCTURE.md',
    'PROMPT_SHORTCUT.md',
    'project.config.md'
  ];

  for (const f of coreFiles) {
    const s = path.join(sourceDir, f);
    const d = path.join(targetDir, f);
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, d);
      console.log(`  [+] Synced file: ${f}`);
    }
  }

  // Preserve target PROJECT_STATUS.md if it already has project tasks
  const statusSrc = path.join(sourceDir, 'PROJECT_STATUS.md');
  const statusDst = path.join(targetDir, 'PROJECT_STATUS.md');
  if (fs.existsSync(statusSrc) && !fs.existsSync(statusDst)) {
    fs.copyFileSync(statusSrc, statusDst);
    console.log(`  [+] Initialized: PROJECT_STATUS.md`);
  } else if (fs.existsSync(statusDst)) {
    console.log(`  [i] Preserved target project status: PROJECT_STATUS.md`);
  }

  // 2. Scripts Directory
  const scriptsSrc = path.join(sourceDir, 'scripts');
  const scriptsDst = path.join(targetDir, 'scripts');
  if (fs.existsSync(scriptsSrc)) {
    copyRecursive(scriptsSrc, scriptsDst);
    console.log(`  [+] Synced scripts/ automation suite`);
  }

  // 3. Inputs Structure & Semantic Modification Folders
  const inputDirs = [
    path.join(targetDir, 'inputs', 'client_docs'),
    path.join(targetDir, 'inputs', 'screenshots'),
    path.join(targetDir, 'inputs', 'modifications', 'update_notes'),
    path.join(targetDir, 'inputs', 'modifications', 'telegram_chats'),
    path.join(targetDir, 'inputs', 'modifications', 'screenshots', 'ui_tweaks'),
    path.join(targetDir, 'inputs', 'modifications', 'screenshots', 'new_sections'),
    path.join(targetDir, 'inputs', 'modifications', 'screenshots', 'bug_fixes'),
    path.join(targetDir, 'frontend', 'public', 'images', 'hero'),
    path.join(targetDir, 'frontend', 'public', 'images', 'products'),
    path.join(targetDir, 'frontend', 'public', 'images', 'categories'),
    path.join(targetDir, 'frontend', 'public', 'images', 'gallery'),
    path.join(targetDir, 'frontend', 'public', 'images', 'features'),
    path.join(targetDir, 'frontend', 'public', 'images', 'anatomy'),
    path.join(targetDir, 'frontend', 'public', 'images', 'showroom'),
    path.join(targetDir, 'frontend', 'public', 'images', 'slices')
  ];

  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const inputFiles = [
    'inputs/references.md',
    'inputs/client_docs/requirements.md',
    'inputs/client_docs/telegram_chat.txt',
    'inputs/client_docs/updates.md',
    'inputs/modifications/README.md',
    'inputs/modifications/update_notes/updates.md',
    'inputs/modifications/update_notes/README.md',
    'inputs/modifications/telegram_chats/telegram_chat.txt',
    'inputs/modifications/telegram_chats/README.md',
    'inputs/modifications/screenshots/README.md'
  ];

  for (const item of inputFiles) {
    const s = path.join(sourceDir, item);
    const d = path.join(targetDir, item);
    if (fs.existsSync(s) && !fs.existsSync(d)) {
      fs.copyFileSync(s, d);
      console.log(`  [+] Initialized template: ${item}`);
    }
  }

  // 4. Planning & Memory Structure
  const planningDst = path.join(targetDir, 'planning');
  const tasksDst = path.join(planningDst, 'tasks');
  if (!fs.existsSync(tasksDst)) {
    fs.mkdirSync(tasksDst, { recursive: true });
  }

  const planningFiles = ['task.md', 'updateplanning.md', 'open-questions.md', 'decisions.md', 'MEMORY.md'];
  for (const p of planningFiles) {
    const s = path.join(sourceDir, 'planning', p);
    const d = path.join(planningDst, p);
    if (fs.existsSync(s) && !fs.existsSync(d)) {
      fs.copyFileSync(s, d);
      console.log(`  [+] Initialized planning/${p}`);
    }
  }
}

module.exports = { syncTo };

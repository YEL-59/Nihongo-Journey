import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import Module from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, '..');
const outDir = path.join(frontendRoot, '.tmp-audit-n1');
const tempTsconfig = path.join(frontendRoot, 'tsconfig.audit-n1.tmp.json');

fs.rmSync(outDir, { recursive: true, force: true });

try {
  fs.writeFileSync(
    tempTsconfig,
    JSON.stringify(
      {
        extends: './tsconfig.json',
        compilerOptions: {
          noEmit: false,
          outDir: '.tmp-audit-n1',
          module: 'commonjs',
          moduleResolution: 'node',
          target: 'ES2020',
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*'],
          },
        },
        include: ['scripts/audit-n1.ts'],
      },
      null,
      2,
    ),
  );

  execFileSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['tsc', '-p', 'tsconfig.audit-n1.tmp.json'],
    { cwd: frontendRoot, stdio: 'inherit', shell: process.platform === 'win32' },
  );

  const originalResolve = Module._resolveFilename;
  Module._resolveFilename = function (request, parent, isMain, options) {
    if (request.startsWith('@/')) {
      const mapped = path.join(outDir, 'src', request.slice(2));
      return originalResolve.call(this, mapped, parent, isMain, options);
    }
    return originalResolve.call(this, request, parent, isMain, options);
  };

  const require = Module.createRequire(import.meta.url);
  require(path.join(outDir, 'scripts', 'audit-n1.js'));
} finally {
  fs.rmSync(tempTsconfig, { force: true });
  fs.rmSync(outDir, { recursive: true, force: true });
}

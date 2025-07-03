#!/usr/bin/env node

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Util function to run commands with logging
const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: "inherit", ...options });
    return true;
  } catch (error) {
    console.error(`❌ Failed to execute: ${command}`);
    console.error(error);
    return false;
  }
};

// Get project name from CLI arg
const projectName = process.argv[2];

if (!projectName) {
  console.log("❌ Please provide a project name.");
  process.exit(1);
}

if (existsSync(projectName)) {
  console.log(`❌ Directory "${projectName}" already exists.`);
  process.exit(1);
}

// Commands
const repo = "https://github.com/kganallinone/kgan.react.router.template.git";
const cloneCommand = `git clone --depth 1 ${repo} ${projectName}`;
const installCommand = "npm install";

console.log(`🚀 Cloning into "${projectName}"...`);
const cloned = runCommand(cloneCommand);
if (!cloned) process.exit(1);

console.log(`📦 Installing dependencies in "${projectName}"...`);
const installed = runCommand(installCommand, {
  cwd: join(process.cwd(), projectName),
});
if (!installed) process.exit(1);

console.log("✅ All done! You can now:");
console.log(`   cd ${projectName}`);
console.log("   npm run dev");

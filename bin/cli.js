#!/usr/bin/env node

import { execSync } from "node:child_process";
import { createInterface } from "node:readline";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Sample usage: clone template and install deps
const repo = "https://github.com/kganallinone/kgan.react.router.template.git";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your project name: ", (projectName) => {
  if (!projectName) {
    console.log("❌ Project name is required.");
    process.exit(1);
  }

  if (existsSync(projectName)) {
    console.log("❌ Directory already exists.");
    process.exit(1);
  }

  console.log(`🚀 Creating project ${projectName}...`);

  try {
    execSync(`git clone ${repo} ${projectName}`, { stdio: "inherit" });
    execSync(`cd ${projectName} && npm install`, {
      stdio: "inherit",
      shell: true,
    });
    console.log("✅ Project setup complete!");
  } catch (err) {
    console.error("❌ Failed to set up project:", err);
  }

  rl.close();
});

#!/usr/bin/env node

import { execSync } from "node:child_process";
import { createInterface } from "node:readline";
import { existsSync } from "node:fs";
import { join } from "node:path";

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
    // Clone the template repo
    execSync(`git clone ${repo} ${projectName}`, { stdio: "inherit" });

    // Define the full path to the project
    const projectPath = join(process.cwd(), projectName);

    // Log where npm install will run
    console.log(`📦 Installing dependencies in ${projectPath}...`);

    // Install dependencies inside the cloned directory
    execSync("npm install", {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log("✅ Project setup complete!");
  } catch (err) {
    console.error("❌ Failed to set up project:", err);
  }

  rl.close();
});

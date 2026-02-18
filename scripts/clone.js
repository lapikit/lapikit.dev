import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const repositories = [
  {
    folder: "lapikit",
    url: "https://github.com/lapikit/lapikit.git",
  },
  {
    folder: "repl",
    url: "https://github.com/lapikit/lapikit-repl.git",
  },
];

const args = process.argv.slice(2);
let branch = null;

for (let i = 0; i < args.length; i += 1) {
  const argument = args[i];

  if (argument === "--branch" || argument === "-b") {
    branch = args[i + 1] ?? null;
    i += 1;
    continue;
  }

  if (!branch) {
    branch = argument;
  }
}

if ((args.includes("--branch") || args.includes("-b")) && !branch) {
  console.error("Missing branch name. Usage: node scripts/clone.js --branch develop");
  process.exit(1);
}

const shellEscape = (value) => `'${String(value).replace(/'/g, "'\\''")}'`;
const packagesDir = join(process.cwd(), "packages");

mkdirSync(packagesDir, { recursive: true });

for (const repository of repositories) {
  if (!repository.folder || !repository.url) {
    console.error(`Invalid repository config: ${JSON.stringify(repository)}`);
    process.exitCode = 1;
    continue;
  }

  const target = join(packagesDir, repository.folder);
  const escapedTarget = shellEscape(target);
  const escapedUrl = shellEscape(repository.url);
  const escapedBranch = branch ? shellEscape(branch) : null;

  if (existsSync(target)) {
    if (!branch) {
      console.log(`Skip: ${repository.folder} already exist`);
      continue;
    }

    console.log(`Update: packages/${repository.folder} on branch ${branch}`);
    execSync("git fetch origin", { cwd: target, stdio: "inherit" });
    try {
      execSync(`git checkout ${escapedBranch}`, { cwd: target, stdio: "inherit" });
    } catch {
      execSync(`git checkout -b ${escapedBranch} origin/${escapedBranch}`, {
        cwd: target,
        stdio: "inherit",
      });
    }
    execSync(`git pull --ff-only origin ${escapedBranch}`, {
      cwd: target,
      stdio: "inherit",
    });
    continue;
  }

  console.log(`Clone: ${repository.url} -> packages/${repository.folder}`);
  if (branch) {
    execSync(
      `git clone --branch ${escapedBranch} --single-branch ${escapedUrl} ${escapedTarget}`,
      { stdio: "inherit" },
    );
    continue;
  }

  execSync(`git clone ${escapedUrl} ${escapedTarget}`, { stdio: "inherit" });
}

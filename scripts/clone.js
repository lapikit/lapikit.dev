import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const repositories = [
  "https://github.com/lapikit/lapikit.git",
  "https://github.com/lapikit/lapikit-repl.git",
];

const packagesDir = join(process.cwd(), "packages");

mkdirSync(packagesDir, { recursive: true });

for (const repository of repositories) {
  const name = repository
    .split("/")
    .pop()
    ?.replace(/\.git$/, "");

  if (!name) {
    console.error(`Repository not found: ${repository}`);
    process.exitCode = 1;
    continue;
  }

  const target = join(packagesDir, name);

  if (existsSync(target)) {
    console.log(`Skip: ${name} already exist`);
    continue;
  }

  console.log(`Clone: ${repository} -> packages/${name}`);
  execSync(`git clone ${repository} ${target}`, { stdio: "inherit" });
}

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const packagesDir = join(process.cwd(), "packages");

if (!existsSync(packagesDir)) {
  console.error("Missing ./packages directory");
  process.exit(1);
}

const packageFolders = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const folder of packageFolders) {
  const packageDir = join(packagesDir, folder);
  const packageJsonPath = join(packageDir, "package.json");

  if (!existsSync(packageJsonPath)) {
    console.log(`Skip: packages/${folder} (no package.json)`);
    continue;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  if (!packageJson?.scripts?.build) {
    console.log(`Skip: packages/${folder} (no build script)`);
    continue;
  }

  console.log(`Build: packages/${folder}`);
  execSync("bun run build", { cwd: packageDir, stdio: "inherit" });
}

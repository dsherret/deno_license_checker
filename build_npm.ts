import { build } from "https://deno.land/x/dnt@0.1.3/mod.ts";
import { copy } from "https://deno.land/std@0.113.0/fs/mod.ts";

await copy("testdata", "npm/esm/testdata", { overwrite: true });
await copy("testdata", "npm/umd/testdata", { overwrite: true });

await build({
  entryPoints: ["./main.ts"],
  outDir: "./npm",
  typeCheck: true,
  declaration: true,
  test: true,
  package: {
    // package.json properties
    name: "@kt3k/license-checker",
    version: "3.1.4",
    description: "📄 CLI tool for checking license headers in files",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/kt3k/deno_license_checker.git",
    },
    bugs: {
      url: "https://github.com/kt3k/deno_license_checker/issues",
    },
  },
});

Deno.writeTextFileSync(
  "./npm/.npmignore",
  "./npm/esm/testdata\n./npm/umd/testdata\n",
  { append: true },
);

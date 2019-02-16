// Copyright 2019 Yoshiya Hinosawa. All rights reserved. MIT license.
import { test, assertEqual } from "https://deno.land/x/testing@v0.2.6/mod.ts";
import { color } from "https://deno.land/x/colors@v0.2.6/mod.ts";
import { chdir } from "deno";
import { xrun, decode } from "./util.ts";

const normalize = (output: string) =>
  output
    .trim()
    .split(/\r?\n/)
    .sort();

const perms = ["--allow-read", "--allow-run"];

test(async function normal() {
  chdir("testdata/normal");
  const data = normalize(await xrun(["deno", ...perms, "../../main.ts"]));
  assertEqual(
    data,
    normalize(`
1.js ... ${color.green("ok")}
1.ts ... ${color.green("ok")}
2.js ${color.red("missing copyright!")}
foo/1.js ... ${color.green("ok")}
foo/2.js ${color.red("missing copyright!")}
foo/bar/1.js ... ${color.green("ok")}
foo/bar/2.js ${color.red("missing copyright!")}
foo/bar/baz/1.js ... ${color.green("ok")}
foo/bar/baz/2.js ${color.red("missing copyright!")}
`)
  );
});

test(async function quiet() {
  const data = normalize(await xrun(["deno", ...perms, "../../main.ts", "-q"]));
  assertEqual(
    data,
    normalize(`
2.js ${color.red("missing copyright!")}
foo/2.js ${color.red("missing copyright!")}
foo/bar/2.js ${color.red("missing copyright!")}
foo/bar/baz/2.js ${color.red("missing copyright!")}
`)
  );
});

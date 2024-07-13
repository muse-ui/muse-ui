import { defineConfig, type Options } from "tsup"
import * as pkgInfo from "./package.json";

const fullYear = new Date().getFullYear()

const banner = `
/**
 * ${pkgInfo.name} v${pkgInfo.version}
 *
 * Copyright (c) 2024${fullYear > 2024 ? `-${fullYear}` : ''} ${pkgInfo.author.name}. All Rights Reserved.
 */
`;

const options: Options = {
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
    format: ["esm", "cjs"],
  noExternal: [/@radix-ui\/*/],
  tsconfig: "tsconfig.build.json",
  banner: {
    js: banner,
  },
};

export default defineConfig([
  {
    ...options,
    entry: ["registry/default/ui/*.tsx", "registry/default/ui/*.ts"],
    outDir: "dist/default"
  },
  {
    ...options,
    entry: ["registry/new-york/ui/*.tsx", "registry/new-york/ui/*.ts"],
    outDir: "dist/new-york"
  },
])

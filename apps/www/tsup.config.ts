import { defineConfig } from "tsup"
import { name, version, author } from "./package.json"

const fullYear = new Date().getFullYear()

export default defineConfig([
  {
    entry: ["registry/default/ui/*.tsx", "registry/default/ui/*.ts"],
    outDir: "dist/default",
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    noExternal: [/@radix-ui\/*/],
    tsconfig: "tsconfig.build.json",
    banner: {
      js: `
      // ${name} v${version}
      // © 2024${fullYear > 2024 ? `-${fullYear}` : ''} ${author.name}. All Rights Reserved.
      `,
    },
  },
  {
    entry: ["registry/new-york/ui/*.tsx", "registry/new-york/ui/*.ts"],
    outDir: "dist/new-york",
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    noExternal: [/@radix-ui\/*/],
    tsconfig: "tsconfig.build.json",
    banner: {
      js: `
      // ${name} v${version}
      // © 2024${fullYear > 2024 ? `-${fullYear}` : ''} ${author.name}. All Rights Reserved.
      `,
    },
  },
])

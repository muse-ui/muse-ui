// @ts-nocheck
import fs from "fs"
import path from "path"

import pkgInfo from "../package.json"

const baseUIPath = path.join(process.cwd(), "registry")
const files = fs.readdirSync(baseUIPath, { withFileTypes: true })

const exports = {
  ".": {
    import: {
      types: "./dist/default/index.d.ts",
      default: "./dist/default/index.js",
    },
    require: {
      types: "./dist/default/index.d.cts",
      default: "./dist/default/index.cjs",
    },
  },
}

for (const file of files) {
  if (file.isDirectory()) {
    const type = file.name
    const componentsPath = path.join(baseUIPath, `${type}/ui`)
    const baseCompPath = path.join(componentsPath, `index.ts`)
    if (fs.existsSync(baseCompPath)) {
      fs.rmSync(baseCompPath)
    }
    const componentFiles = fs.readdirSync(componentsPath, {
      withFileTypes: true,
    })
    const componentNames = componentFiles.map((componentFile: any) =>
      path.basename(componentFile.name, path.extname(componentFile.name))
    )

    exports[`./${type}`] = {
      import: {
        types: `./dist/${type}/index.d.ts`,
        default: `./dist/${type}/index.js`,
      },
      require: {
        types: `./dist/${type}/index.d.cts`,
        default: `./dist/${type}/index.cjs`,
      },
    }

    let content = '"use client"\n'
    for (const componentName of componentNames) {
      if (componentName === "sonner") {
        content += `export { Toaster as Sonner } from "./${componentName}"\n`
      } else {
        content += `export * from "./${componentName}"\n`
      }

      exports[`./${type}/${componentName}`] = {
        import: {
          types: `./dist/${type}/${componentName}.d.ts`,
          default: `./dist/${type}/${componentName}.js`,
        },
        require: {
          types: `./dist/${type}/${componentName}.d.cts`,
          default: `./dist/${type}/${componentName}.cjs`,
        },
      }
    }
    fs.writeFileSync(baseCompPath, content, "utf8")
  }
}

const pkgInfoPath = path.join(process.cwd(), "package.json")
fs.writeFileSync(
  pkgInfoPath,
  JSON.stringify({ ...(pkgInfo || {}), exports }, null, 2) + '\n',
  "utf8"
)

console.log("✅ Done!")

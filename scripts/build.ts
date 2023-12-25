import { execSync } from 'node:child_process'
import fs from 'fs-extra'

async function build() {
  await fs.remove('./dist')
  execSync('tsup src/index.ts --format cjs --external vscode --no-shims', { stdio: 'inherit' })

  const files = [
    'LICENSE',
    'README.md',
    '.vscodeignore',
    'res',
  ]

  for (const f of files)
    await fs.copy(`./${f}`, `./dist/${f}`)

  const json = await fs.readJSON('./package.json')
  delete json.scripts
  delete json.devDependencies
  json.main = 'index.js'
  await fs.writeJSON('./dist/package.json', json)
}

build()

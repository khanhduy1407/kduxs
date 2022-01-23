const fs = require('fs-extra')
const chalk = require('chalk')
const execa = require('execa')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')

const files = [
  'dist/kduxs.esm-browser.js',
  'dist/kduxs.esm-browser.prod.js',
  'dist/kduxs.esm-bundler.js',
  'dist/kduxs.global.js',
  'dist/kduxs.global.prod.js',
  'dist/kduxs.cjs.js'
]

async function run() {
  await Promise.all([build(), copy()])
  checkAllSizes()
}

async function build() {
  await execa('rollup', ['-c', 'rollup.config.js'], { stdio: 'inherit' })
}

async function copy() {
   await fs.copy('src/index.mjs', 'dist/kduxs.mjs')
 }

function checkAllSizes() {
  console.log()
  files.map((f) => checkSize(f))
  console.log()
}

function checkSize(file) {
  const f = fs.readFileSync(file)
  const minSize = (f.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(f)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(f)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(file)
    )} size:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}

run()

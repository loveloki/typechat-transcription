const path = require("path")

const buildEslintCommand = (stagedFiles) =>
  `next lint --fix --file ${stagedFiles
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`

const buildPrettierCommand = (stagedFiles) =>
  `prettier --ignore-unknown --write ${stagedFiles.join(" ")}`

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
  "!(*.{js,jsx,ts,tsx})": [buildPrettierCommand],
}

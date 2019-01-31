import pkg from './package.json'
import arg from 'arg'
import chalk from 'chalk'

import {showHelp} from './lib/help'
import {exit, abort} from './lib/program'
import promptCredentials from './lib/prompt'
import {readJSON, checkJSON, createTemplate} from './lib/json'
import automateTasks from './lib/lbc/index'

// -------------------------------------------------------------
// Arguments.
// -------------------------------------------------------------

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--generate': String,

  // Aliases.
  '-h': '--help',
  '-v': '--version',
  '-G': '--generate'
})

if (args['--version']) {
  exit(pkg.version)
}

if (args['--help']) {
  exit(showHelp)
}

// -------------------------------------------------------------
// Script.
// -------------------------------------------------------------

// Generate mode.
if (args['--generate']) {
  generate(args['--generate'])
} else {
  // We need at least one argument.
  if (args._.length === 0) {
    abort(1, 'No argument provided.')
  }

  run()
}

// -------------------------------------------------------------
// Commands.
// -------------------------------------------------------------

async function run() {
  let data

  try {
    const [file, ...rest] = args._
    data = await readJSON(file)
  } catch (e) {
    abort(2, e.message)
  }

  // No data?
  if (!data) {
    abort(4, 'File is empty or non-conform.')
  }

  // Invalid data format?
  if (!checkJSON(data)) {
    abort(4, 'Incorrect data!')
  }

  // All good? Let's automate.
  try {
    const credentials = await promptCredentials()
    if (!credentials.ok) exit()

    await automateTasks(data, credentials)
  } catch {
    abort(3, 'Visual automation failed.')
  }
}

async function generate(filename) {
  try {
    await createTemplate(filename)
    exit(chalk.green(`File generated at ${filename}`))
  } catch (e) {
    abort(6, e.message)
  }
}

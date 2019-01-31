import pkg from './package.json'
import arg from 'arg'
import dotenv from 'dotenv'

import {showHelp} from './lib/help'
import {exit, abort} from './lib/program'
import {readJSON, checkJSON} from './lib/json'
import automateTasks from './lib/lbc/index'

// -------------------------------------------------------------
// Arguments.
// -------------------------------------------------------------

const args = arg({
  '--help': Boolean,
  '--version': Boolean,

  // Aliases.
  '-h': '--help',
  '-v': '--version'
})

if (args['--version']) {
  exit(pkg.version)
}

if (args['--help']) {
  exit(showHelp)
}

if (args._.length === 0) {
  showHelp()
  abort(1, '\nNo argument provided.')
}

// -------------------------------------------------------------
// Script.
// -------------------------------------------------------------

dotenv.config()
run()

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
    automateTasks(data)
  } catch {
    abort(3, 'Visual automation failed.')
  }
}

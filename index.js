import pkg from './package.json'
import arg from 'arg'
import dotenv from 'dotenv'

import {showHelp} from './lib/help'
import {exit, abort} from './lib/program'
import automateTasks from './lib/lbc/index'

// -------------------------------------------------------------
// Script.
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

dotenv.config()

try {
} catch {
  abort(2, 'JSON file parsing failed.')
}

try {
  automateTasks()
} catch {
  abort(3, 'Visual automation failed.')
}

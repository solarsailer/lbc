import pkg from './package.json'
import arg from 'arg'
import chalk from 'chalk'
import dotenv from 'dotenv'

import {showHelp} from './lib/help'
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
  console.log(pkg.version)
  process.exit(0)
}

if (args['--help']) {
  showHelp()
  process.exit(0)
}

if (args._.length === 0) {
  showHelp()
  console.error(chalk.red('No argument provided.'))
  process.exit(1)
}

dotenv.config()

try {
  automateTasks()
} catch {
  console.error(chalk.red('Visual automation failed.'))
  process.exit(2)
}

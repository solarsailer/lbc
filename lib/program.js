import chalk from 'chalk'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export function exit(arg) {
  if (arg && typeof arg === 'string') console.log(arg)
  if (arg && typeof arg === 'function') arg()

  process.exit(0)
}

export function abort(code, arg) {
  if (arg && typeof arg === 'string') console.error(chalk.red(arg))

  process.exit(code)
}

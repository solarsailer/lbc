import chalk from 'chalk'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export function showHelp() {
  console.log('')
  console.log(chalk.blue('  Usage: automate ad creation on LeBonCoin.'))
  console.log('')
  console.log('  Examples:')
  console.log('')
  console.log('    - Create an ad from a JSON file:')
  console.log(`      ${chalk.bold.yellow('automacorner ad.json')}`)
}

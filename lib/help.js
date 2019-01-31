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
  console.log(`      ${chalk.bold.yellow('lbc ad.json')}`)
  console.log('')
  console.log('    - Generate a template for a new ad:')
  console.log(`      ${chalk.bold.yellow('lbc --generate path/to/ad.json')}`)
}

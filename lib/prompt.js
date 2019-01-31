import inquirer from 'inquirer'
import chalk from 'chalk'

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const QUESTIONS = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email:',
    validate(val) {
      if (val.includes('@')) return true

      return 'Please enter a valid email address.'
    }
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password:'
  },
  {
    type: 'input',
    name: 'phone',
    message: `Finally, what's your phone number?`
  },
  {
    type: 'confirm',
    name: 'ok',
    message: `All good, proceed?`,
    default: false
  }
]

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export default async () => {
  console.log(
    `We need your LeBonCoin account credentials in order to automate your ad posting.`
  )
  console.log(
    chalk.bold.green(`Don't worry, we do not store or transmit them.`)
  )
  console.log('')

  return await inquirer.prompt(QUESTIONS)
}

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
    default: true
  }
]

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

// Combine the default questions with .env answers (mostly for debug and dev).
function createInitialAnswersAndQuestions() {
  const env = process.env

  // Default answers.
  const answers = {}

  // Remove each question that is already answered by an env variable.
  const questions = QUESTIONS.reduce((acc, x) => {
    // An env variable has the same name.
    const envVariableValue = env[x.name]

    if (!envVariableValue) {
      // No env variable for this question? Keep it.
      acc.push(x)
    } else {
      // Otherwise, add the result to the answers and ignore this question.
      answers[x.name] = envVariableValue
    }

    return acc
  }, [])

  return {
    questions,
    answers
  }
}

export default async () => {
  const start = createInitialAnswersAndQuestions()

  console.log(
    `We need your leboncoin.fr account credentials in order to automate your ad posting.`
  )
  console.log(
    chalk.bold.green(`Don't worry, we do not store or transmit them.`)
  )
  console.log('')

  const answers = await inquirer.prompt(start.questions)

  return {...answers, ...start.answers}
}

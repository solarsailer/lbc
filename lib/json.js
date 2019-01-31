import chalk from 'chalk'
import path from 'path'
import {promisify} from 'util'
import {readFile as readFileCallback, writeFile as writeFileCallback} from 'fs'

const readFile = promisify(readFileCallback)
const writeFile = promisify(writeFileCallback)

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export async function createTemplate(path) {
  const template = {
    category: 'Informatique',
    title: '',
    description: '',
    price: 5,
    postal: '75010',
    street: '42 rue des Boulevards',
    images: []
  }

  const data = JSON.stringify(template, null, 2)
  await writeFile(path, data, 'utf-8')
}

export async function readJSON(filename) {
  if (path.extname(filename) !== '.json') {
    throw new Error('Non-JSON file are not allowed.')
  }

  const data = await readFile(filename, 'utf-8')
  const json = JSON.parse(data)

  // Change each image's path to an absolute one.
  if (Array.isArray(json.images)) {
    json.images = json.images.map(x => {
      const folder = path.dirname(path.resolve(filename))
      return path.resolve(folder, x)
    })
  }

  return json
}

export function checkJSON(data) {
  const errors = []

  testDefined(data.category, 'category', errors)
  testDefined(data.title, 'title', errors)
  testDefined(data.description, 'description', errors)
  testDefined(data.price, 'price', errors)
  testDefined(data.postal, 'postal code', errors)
  testDefined(data.street, 'street', errors)
  testDefined(data.images, 'images', errors)

  testString(data.category, 'category', errors)
  testString(data.title, 'title', errors)
  testString(data.description, 'description', errors)
  testString(data.postal, 'postal code', errors)
  testString(data.street, 'street', errors)

  testNumber(data.price, 'price', errors)

  testArray(data.images, 'images', errors)

  testLength(data.description, 'description', 15, errors)

  // Show errors.
  errors.forEach(x => console.error(chalk.red('- ' + x)))
  return !Boolean(errors.length)
}

function testDefined(val, name, errors) {
  if (!val) errors.push(`No ${name} provided.`)
}

function testLength(val, name, minLength, errors) {
  if (val && typeof val === 'string' && val.length < minLength) {
    errors.push(
      `The ${name} is too short. Expect at least ${minLength} characters, got ${
        val.length
      }.`
    )
  }
}

function testString(val, name, errors) {
  if (val && typeof val !== 'string') {
    errors.push(`The ${name} must be a string.`)
  }
}

function testNumber(val, name, errors) {
  if (val && typeof val !== 'number') {
    errors.push(`The ${name} must be a number.`)
  }
}

function testArray(val, name, errors) {
  if (val && !Array.isArray(val)) {
    errors.push(`The ${name} must be an array.`)
  }
}

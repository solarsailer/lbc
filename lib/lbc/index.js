import puppeteer from 'puppeteer'
import inquirer from 'inquirer'

import automateLogin from './task-login'
import automateAd from './task-ad'
import automateRecap from './task-recap'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export default async (data, credentials) => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()

  // Configure.
  await page.setViewport({width: 1280, height: 800})

  // Start automation.
  console.log('Automating ad creation…')
  await automateLogin(page, credentials)
  await automateAd(page, data, credentials)
  await automateRecap(page)
  console.log('Done!\n')

  // Add a final prompt to close the browser.
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'e',
      message: `Press Enter to quit.`
    }
  ])

  await browser.close()
}

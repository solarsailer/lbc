import puppeteer from 'puppeteer'

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
  console.log('Done!')
}

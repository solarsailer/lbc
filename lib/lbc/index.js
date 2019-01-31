import puppeteer from 'puppeteer'

import automateLogin from './task-login'
import automateAd from './task-ad'
import automateRecap from './task-recap'

// -------------------------------------------------------------
// TODO: read JSON/MD and create these values dynamically.
// -------------------------------------------------------------

const data = {
  category: 'Jeux & Jouets',
  title: 'Test Ad',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nMorbi ornare nibh ipsum, non placerat urna tincidunt ac.',
  price: 42.58,
  postal: '75003',
  street: 'Rue de Saintonge'
}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export default async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()

  // Configure.
  await page.setViewport({width: 1280, height: 800})

  // Start automation.
  console.log('Automating ad creation…')
  await automateLogin(page)
  await automateAd(page, data)
  await automateRecap(page)
  console.log('Done!')
}

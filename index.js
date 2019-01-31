require('dotenv').config()

const puppeteer = require('puppeteer')

// -------------------------------------------------------------
// TODO: read JSON/MD and create these values dynamically.
// -------------------------------------------------------------

const offer = {
  category: 'Jeux & Jouets',
  title: 'Test Ad',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nMorbi ornare nibh ipsum, non placerat urna tincidunt ac.',
  price: 42.58,
  code: '75003',
  address: 'Rue de Saintonge'
}

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

const SELECTOR_BUTTON_LOGIN =
  '[data-qa-id="profilarea-login"] [data-text="Se connecter"]'

const SELECTOR_LOGIN_EMAIL = '[aria-label="AuthModal"] #form #email'
const SELECTOR_LOGIN_PASSWORD = '[aria-label="AuthModal"] #form #password'
const SELECTOR_LOGIN_BUTTON = '[aria-label="AuthModal"] #form button'

const SELECTOR_LOGGED_IN = `[data-qa-id="profilarea-logged"] [data-text="${
  process.env.USERNAME
}"]`

async function login(page) {
  await page.goto('https://www.leboncoin.fr/')

  await page.waitForSelector(SELECTOR_BUTTON_LOGIN)
  await page.click(SELECTOR_BUTTON_LOGIN)

  await page.waitForSelector(SELECTOR_LOGIN_EMAIL)
  await page.type(SELECTOR_LOGIN_EMAIL, process.env.EMAIL)
  await page.type(SELECTOR_LOGIN_PASSWORD, process.env.PASSWORD)
  await page.click(SELECTOR_LOGIN_BUTTON)

  await page.waitForSelector(SELECTOR_LOGGED_IN)
}

const SELECTOR_OFFER_SELECT = `#formular #category`
const SELECTOR_OFFER_RADIO = '#formular .radio #rs'
const SELECTOR_OFFER_TITLE = '#formular #subject'
const SELECTOR_OFFER_DESC = '#formular #body'
const SELECTOR_OFFER_PRICE = '#formular #price'

const SELECTOR_LOC_CODE = '#form_part_localisation #location_p'
const SELECTOR_LOC_ADDRESS = '#form_part_localisation #address'

const SELECTOR_USER_PHONE = '#form_part_informations #phone'
const SELECTOR_USER_HIDE = '#form_part_informations #phone_hidden'

const SELECTOR_OFFER_VALID = '#formular #newadSubmit'

async function addOffer(page) {
  await page.goto('https://www.leboncoin.fr/ai')
  await page.waitForSelector(SELECTOR_OFFER_SELECT)

  // Find the correct option value from the text category provided.
  const optionValue = await page.evaluate(
    (selector, category) => {
      const options = Array.from(document.querySelector(selector).children)

      const el = options.find(x => {
        return (
          x.textContent.trim().toLowerCase() === category.trim().toLowerCase()
        )
      })

      return el.value
    },
    SELECTOR_OFFER_SELECT,
    offer.category
  )

  // Set the correct option and type.
  await page.select(SELECTOR_OFFER_SELECT, optionValue)
  await page.click(SELECTOR_OFFER_RADIO)

  // Fill the fields.
  await page.type(SELECTOR_OFFER_TITLE, offer.title)
  await page.type(SELECTOR_OFFER_DESC, offer.description)
  await page.type(SELECTOR_OFFER_PRICE, Math.trunc(offer.price) + '')

  // Postal code.
  await page.type(SELECTOR_LOC_CODE, offer.code)
  await page.waitFor(500)
  await page.keyboard.press('Enter')

  // Address.
  await page.type(SELECTOR_LOC_ADDRESS, offer.address)
  await page.waitFor(500)
  await page.keyboard.press('Enter')

  // Phone.
  await page.type(SELECTOR_USER_PHONE, process.env.PHONE)
  await page.click(SELECTOR_USER_HIDE)

  // And submit!
  await page.click(SELECTOR_OFFER_VALID)
}

const SELECTOR_RECAP_PAGE = '#newad_preview'
const SELECTOR_RECAP_PREVIEW = '#newad_preview section h2.title.toggleElement'
const SELECTOR_RECAP_ACCEPT = '#newad_preview #accept_rule'

async function checkRecap(page) {
  // We need to wait because we will arrive on this page through a button click.
  await page.waitForSelector(SELECTOR_RECAP_PAGE)

  // Accept terms and conditons.
  await page.click(SELECTOR_RECAP_ACCEPT)

  // Open the preview section.
  await page.click(SELECTOR_RECAP_PREVIEW)
}

// -------------------------------------------------------------
// Init.
// -------------------------------------------------------------

async function start() {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.setViewport({width: 1280, height: 800})

  await login(page)
  await addOffer(page)
  await checkRecap(page)
}

start()

// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const $LOGIN = '[data-qa-id="profilarea-login"] [data-text="Se connecter"]'

const $FORM_EMAIL = '[aria-label="AuthModal"] #form #email'
const $FORM_PASSWORD = '[aria-label="AuthModal"] #form #password'
const $FORM_BUTTON = '[aria-label="AuthModal"] #form button'

const $LOGGED_IN = '[data-qa-id="profilarea-logged"]'

// -------------------------------------------------------------
// Module.
// -------------------------------------------------------------

export default async page => {
  await page.goto('https://www.leboncoin.fr/')

  // Page loaded? Ok, click to show the modal.
  await page.waitForSelector($LOGIN)
  await page.click($LOGIN)

  // The modal has appeared?
  await page.waitForSelector($FORM_EMAIL)

  // Fill the form and submit.
  await page.type($FORM_EMAIL, process.env.EMAIL)
  await page.type($FORM_PASSWORD, process.env.PASSWORD)
  await page.click($FORM_BUTTON)

  // We need to wait for this selector to confirm that the login has been successful.
  await page.waitForSelector($LOGGED_IN)
}

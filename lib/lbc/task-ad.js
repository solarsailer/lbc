// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

// Ad information.
const $AD_SELECT = `#formular #category`
const $AD_TYPE = '#formular .radio #rs'
const $AD_TITLE = '#formular #subject'
const $AD_DESC = '#formular #body'
const $AD_PRICE = '#formular #price'

// Localization.
const $USER_POSTAL = '#form_part_localisation #location_p'
const $USER_STREET = '#form_part_localisation #address'

// User info.
const $USER_PHONE = '#form_part_informations #phone'
const $USER_HIDE = '#form_part_informations #phone_hidden'

// The button that submits the ad for previewing.
const $BUTTON_SUBMIT = '#formular #newadSubmit'

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

async function findMatchingOption(page, selector, val) {
  const result = await page.evaluate(
    (selector, val) => {
      const normalize = x => x.trim().toLowerCase()

      // Find all the <option> nodes.
      const options = Array.from(document.querySelector(selector).children)

      // And find a matching element.
      const el = options.find(x => {
        return normalize(x.textContent) === normalize(val)
      })

      // We are only interested in the value of the <option>.
      return el.value
    },
    // Node we target.
    selector,
    // The value we need to find.
    val
  )

  return result
}

async function fillAutocompleteField(page, selector, text) {
  await page.type(selector, text)
  await page.waitFor(250)
  await page.keyboard.press('Enter')
  await page.waitFor(250)
}

function convertNumber(x) {
  return Math.trunc(Number(x)) + ''
}

export default async (page, data) => {
  // We assume that we have logged in before calling this function.
  await page.goto('https://www.leboncoin.fr/ai')
  await page.waitForSelector($AD_SELECT)

  // Find the correct option value from the text category provided.
  const optionValue = await findMatchingOption(page, $AD_SELECT, data.category)

  // Fill ad information.
  await page.select($AD_SELECT, optionValue)
  await page.click($AD_TYPE)
  await page.type($AD_TITLE, data.title)
  await page.type($AD_DESC, data.description)
  await page.type($AD_PRICE, convertNumber(data.price))

  // Address.
  await fillAutocompleteField(page, $USER_POSTAL, data.postal)
  await fillAutocompleteField(page, $USER_STREET, data.street)

  // Phone.
  await page.type($USER_PHONE, process.env.PHONE)
  await page.click($USER_HIDE)

  // And submit!
  await page.click($BUTTON_SUBMIT)
}

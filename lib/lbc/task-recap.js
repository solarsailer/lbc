// -------------------------------------------------------------
// Constants.
// -------------------------------------------------------------

const $CONTAINER = '#newad_preview'
const $PREVIEW_TOGGLE = '#newad_preview section h2.title.toggleElement'
const $BUTTON_TERMS = '#newad_preview #accept_rule'

// -------------------------------------------------------------
// Export.
// -------------------------------------------------------------

export default async page => {
  console.log('Automating recap…')

  // We need to wait for this selector because we will arrive on this page through a button click.
  await page.waitForSelector($CONTAINER)

  // Accept terms and conditons.
  await page.click($BUTTON_TERMS)

  // And open the preview section.
  await page.click($PREVIEW_TOGGLE)

  // The user needs to manually confirm the new ad.
}

# lbc

Automate ad creation on LeBonCoin.

## TODO

- [ ] If an image is not uploaded correctly, retry.

  Markup when it's broken:

  ```html
  <div id="uploadPhoto-0" data-state="uploaded">
    <img src="https://img3.leboncoin.fr/ad-thumb/.jpg">
  </div>
  ```

  The correct indicator here is the `ad-thumb/.jpg` and `data-state="uploaded"` at the end. If we detect that, we could try a new upload.

- [ ] Package with NCC/PKG.

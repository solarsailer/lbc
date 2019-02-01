# ![lbc](header.png)

> Automate ad creation on [leboncoin.fr][lbc].

[![NPM - lbc](https://badgen.net/npm/v/@matthieuoger/lbc)](https://www.npmjs.com/package/@matthieuoger/lbc)

* [Install](#install)
* [Usage](#usage)
* [Rational](#rational)
* [TODO](#todo)

**Warning 1: I've only tested this package on my computer and with my workflow. This is an alpha. Use with caution.**

**Warning 2: this package relies heavily on visual automation with [Puppeteer](https://github.com/GoogleChrome/puppeteer/). If the developers change the markup on [leboncoin.fr][lbc], it will break.**

---

## Install

```bash
yarn global add @matthieuoger/lbc
```

## Usage

### Post an ad

You have this JSON file:

```json
{
  "category": "Jeux & Jouets",
  "title": "Ad Example",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nMorbi ornare nibh ipsum, non placerat urna tincidunt ac.",
  "price": 42.48,
  "postal": "75003",
  "street": "Rue de Saintonge",
  "images": ["01.jpg", "02.jpg", "03.jpg"]
}
```

You want to post it:

```bash
lbc file.json
```

The command will ask for some information, like your user account and password (don't worry, they are not transmitted or used outside of leboncoin.fr, check the code). Then, it will open a webpage and do its work all alone.

You just have to valid the ad at the end. _We could do that automatically, but I think it's better to let the user do this task manually._

### Create a template for a new ad

If you want to prepare a new ad, just do:

```bash
lbc --generate new_ad.json
```

And fill it.

## Rational

This package might seem a bit strange, but it serves a clear purpose: I always store an ad and its images and after a few weeks, if the item has not been sold, I re-create a new ad with the same data.

It was tedious to copy and paste everything each time, and since I was keeping the files anyways, I decided to automate this task.

## TODO

- [ ] Windows support.
- [ ] If an image is not uploaded correctly, retry.

  Markup when it's broken:

  ```html
  <div id="uploadPhoto-0" data-state="uploaded">
    <img src="https://img3.leboncoin.fr/ad-thumb/.jpg">
  </div>
  ```

  The correct indicator here is the `ad-thumb/.jpg` and `data-state="uploaded"` at the end. If we detect that, we could try a new upload.

- [ ] Package with NCC/PKG.


[lbc]: https://www.leboncoin.fr/

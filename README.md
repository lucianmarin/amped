# amped

Command-line tool and Node.js script that converts HTML fragments into valid Google AMP HTML.

## How It Works

1. Parses input HTML into a structured `article-json` representation using [`html-to-article-json`](https://github.com/micnews/html-to-article-json).
2. Automatically fetches missing `width` and `height` dimensions for `<img>` embeds over HTTP/HTTPS via [`request-image-size`](https://github.com/iteriani/request-image-size) (required by the AMP specification).
3. Renders the resulting article tree into AMP HTML using [`article-json-to-amp`](https://github.com/micnews/article-json-to-amp) and prints it to `stdout`.

## Installation

```bash
npm install -g amped
```

Uninstall:

```bash
npm uninstall -g amped
```

## Usage

Convert an HTML string to AMP HTML:

```bash
amped --html '<p>Test</p><img src="https://example.com/photo.jpg">'
```

Options:

- `-h, --html [html]` — Input HTML string to convert
- `-V, --version` — Output the version number (`1.2.7`)

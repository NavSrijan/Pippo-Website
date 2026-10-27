# Pippo Website

Static landing page and privacy policy for the Pippo Discord bot.

## Preview locally

From this directory, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publishing

GitHub Pages publishes the repository root from the `main` branch. The custom hostname is `pippo.shoonya.live`; configure that hostname in the repository's Pages settings and point its DNS record at the target GitHub provides.

The page is plain HTML, CSS, and JavaScript. It has no package installation or build step.

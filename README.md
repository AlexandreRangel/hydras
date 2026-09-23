# hydras

Fullscreen Hydra patches for **Livro HYDRA** (QR codes in the printed book).

Live: [https://alexandrerangel.github.io/hydras/](https://alexandrerangel.github.io/hydras/)

**AR:** [https://alexandrerangel.github.io/hydras/ar/](https://alexandrerangel.github.io/hydras/ar/) — WebXR page that places a live Hydra panel on a detected wall or floor (Android Chrome; iOS Safari when WebXR AR is available). Playlist starts with The Wall (`2025-11-10`, `2025-09-11`). Record with the phone OS, not an in-app recorder.

## Entries

| Date | Title | URL |
|---|---|---|
| 2022-05-19 | Copacabana | [/hydras/2022-05-19/](https://alexandrerangel.github.io/hydras/2022-05-19/) |

Each entry page is a full-viewport Hydra canvas (no editor chrome). Patches match the Livro HYDRA source in `patches/`.

## Tech

- [hydra-synth](https://github.com/hydra-synth/hydra-synth) via CDN (`1.3.29` on entry pages and `/ar/`)
- `/ar/` uses [three.js](https://threejs.org/) `0.186.0` + WebXR `ARButton` hit-test
- GitHub Pages from `main` branch root

© Alexandre Rangel

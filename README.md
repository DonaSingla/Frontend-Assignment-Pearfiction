# Slot Machine

A browser-based 5×3 slot machine built with **PixiJS v7**, **ES6 modules**, and bundled with **Vite**.

---

## Setup

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build → dist/
npm test         # run unit tests
```

---

## How to play

1. When the page loads, a preloader shows the asset loading percentage.
2. Once loaded, the reels display their starting position.
3. Click the **Spin** button to randomise the reels.
4. Any wins across the 7 paylines are shown below the button.
5. The game scales to fit any window size.

---

## Project structure

```
src/
├── config/
│   └── gameConfig.js      Game data: reel bands, paytable, paylines, asset paths
├── logic/
│   ├── reelLogic.js       Reel position → visible symbols
│   └── winCalculator.js   Screen grid → win results + formatting
├── scenes/
│   └── GameScene.js       Builds and updates the PixiJS scene
└── main.js                Entry point: creates app, loads assets, starts game

tests/
├── reelLogic.test.js
└── winCalculator.test.js
```

The `config` holds static data, `logic` has pure functions (no PixiJS, fully testable), and `scenes` handles all rendering.

---

## Paylines

| ID | Description |
|----|-------------|
| 1  | Middle row |
| 2  | Top row |
| 3  | Bottom row |
| 4  | Diagonal down (top-left → bottom-right) |
| 5  | Diagonal up (bottom-left → top-right) |
| 6  | V-shape |
| 7  | Inverted V |

All paylines pay left to right from column 1, minimum 3 matching symbols.

---

## Paytable

| Symbol | ×3 | ×4 | ×5 |
|--------|----|----|-----|
| hv1    | 10 | 20 | 50 |
| hv2    | 5  | 10 | 20 |
| hv3    | 5  | 10 | 15 |
| hv4    | 5  | 10 | 15 |
| lv1    | 2  | 5  | 10 |
| lv2    | 1  | 2  | 5  |
| lv3    | 1  | 2  | 3  |
| lv4    | 1  | 2  | 3  |

## Data flow Summary

User clicks Spin
    ↓
randomPosition() → new positions
    ↓
buildScreen() → 3×5 grid of symbol names
    ↓
Update sprites with new textures
    ↓
calculateWins() → check all 7 paylines
    ↓
formatWins() → display results
    ↓
Ready for next spin


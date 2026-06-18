import { REELSET, ROWS, COLS } from '../config/gameConfig.js';

/*getColumnSymbols(col, positions[col])
Example: getColumnSymbols(0, 14)
band = REELSET[0]
[band[14%20], band[15%20], band[16%20]]
 ['lv1', 'hv2', 'hv2']
gets symbols for a reel(column) at a specific position
*/

export function getColumnSymbols(reelIndex, position) {
    const band = REELSET[reelIndex];
    const top    = band[position % band.length];
    const middle = band[(position + 1) % band.length];
    const bottom = band[(position + 2) % band.length];
    return [top, middle, bottom];
}

/* buildScreen(positions)
Example: buildScreen([14, 2, 8, 5, 11])
 calls getColumnSymbols(col, positions[col]) for each column
  get symbols for column 0 at position 14
  get symbols for column 1 at position 2
  ...
 returns a 3×5 grid of symbols
*/

export function buildScreen(positions) {
    const screen = [];
    for (let row = 0; row < ROWS; row++) {
        screen[row] = [];
        for (let col = 0; col < COLS; col++) {
            const symbols = getColumnSymbols(col, positions[col]);
            screen[row][col] = symbols[row];
        }
    }
    return screen;
}

/*

Example: randomPosition(0)
returns a random index into REELSET[0]
= 0..19

*/
export function randomPosition(reelIndex) {
    return Math.floor(Math.random() * REELSET[reelIndex].length);
}

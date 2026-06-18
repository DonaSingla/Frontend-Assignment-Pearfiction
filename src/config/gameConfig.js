export const COLS = 5;
export const ROWS = 3;
export const BAND_LENGTH = 20;

export const REELSET = [
    ['hv2','lv3','lv3','hv1','hv1','lv1','hv1','hv4','lv1','hv3','hv2','hv3','lv4','hv4','lv1','hv2','lv4','lv1','lv3','hv2'],
    ['hv1','lv2','lv3','lv2','lv1','lv1','lv4','lv1','lv1','hv4','lv3','hv2','lv1','lv3','hv1','lv1','lv2','lv4','lv3','lv2'],
    ['lv1','hv2','lv3','lv4','hv3','hv2','lv2','hv2','hv2','lv1','hv3','lv1','hv1','lv2','hv3','hv2','hv4','hv1','lv2','lv4'],
    ['hv2','lv2','hv3','lv2','lv4','lv4','hv3','lv2','lv4','hv1','lv1','hv1','lv2','hv3','lv2','lv3','hv2','lv1','hv3','lv2'],
    ['lv3','lv4','hv2','hv3','hv4','hv1','hv3','hv2','hv2','hv4','hv4','hv2','lv2','hv4','hv1','lv2','hv1','lv2','hv4','lv4'],
];

// paytable[symbol][matchCount] = payout
export const PAYTABLE = {
    hv1: { 3: 10, 4: 20, 5: 50 },
    hv2: { 3: 5,  4: 10, 5: 20 },
    hv3: { 3: 5,  4: 10, 5: 15 },
    hv4: { 3: 5,  4: 10, 5: 15 },
    lv1: { 3: 2,  4: 5,  5: 10 },
    lv2: { 3: 1,  4: 2,  5: 5  },
    lv3: { 3: 1,  4: 2,  5: 3  },
    lv4: { 3: 1,  4: 2,  5: 3  },
};

// Each payline is an array of [row, col] pairs for columns 0–4 (left to right)
export const PAYLINES = [
    { id: 1, positions: [[1,0],[1,1],[1,2],[1,3],[1,4]] }, // middle row
    { id: 2, positions: [[0,0],[0,1],[0,2],[0,3],[0,4]] }, // top row
    { id: 3, positions: [[2,0],[2,1],[2,2],[2,3],[2,4]] }, // bottom row
    { id: 4, positions: [[0,0],[0,1],[1,2],[2,3],[2,4]] }, // diagonal down-right
    { id: 5, positions: [[2,0],[2,1],[1,2],[0,3],[0,4]] }, // diagonal up-right
    { id: 6, positions: [[0,0],[1,1],[2,2],[1,3],[0,4]] }, // V shape
    { id: 7, positions: [[2,0],[1,1],[0,2],[1,3],[2,4]] }, // inverted V
];

export const SYMBOL_IDS = ['hv1','hv2','hv3','hv4','lv1','lv2','lv3','lv4'];

export const ASSETS = {
    spin_button: 'assets/spin_button.png',
    hv1: 'assets/hv1_symbol.png',
    hv2: 'assets/hv2_symbol.png',
    hv3: 'assets/hv3_symbol.png',
    hv4: 'assets/hv4_symbol.png',
    lv1: 'assets/lv1_symbol.png',
    lv2: 'assets/lv2_symbol.png',
    lv3: 'assets/lv3_symbol.png',
    lv4: 'assets/lv4_symbol.png',
};

export const INITIAL_POSITIONS = [0, 0, 0, 0, 0];

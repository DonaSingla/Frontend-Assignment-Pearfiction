import { PAYLINES, PAYTABLE } from '../config/gameConfig.js';

/*
Example: checkPayline(PAYLINES[0], screen)

- PAYLINES[0] is the middle row (1,0), (1,1), (1,2), (1,3), (1,4)
- firstSymbol = screen[1][0]
- Loop through positions:
  - If symbols match → count++
  - If mismatch → break
- If count ≥ 3 → return win object
*/

export function checkPayline(payline, screen) {
    const firstSymbol = screen[payline.positions[0][0]][payline.positions[0][1]];
    let count = 0;
    for (const [row, col] of payline.positions) {
        if (screen[row][col] === firstSymbol) {
            count++;
        } else {
            break;
        }
    }
    if (count < 3) return null;
    return {
        paylineId: payline.id,
        symbol: firstSymbol,
        count: count,
        payout: PAYTABLE[firstSymbol][count],
    };
}

/* calculateWins(screen)

 calls checkPayline() for each of the 7 paylines

 collect all non-null results

 Example output:
 [
  { paylineId: 2, symbol: 'hv2', count: 3, payout: 5 },
  { paylineId: 5, symbol: 'lv3', count: 3, payout: 1 }
]

*/
export function calculateWins(screen) {
    const wins = [];
    for (const payline of PAYLINES) {
        const result = checkPayline(payline, screen);
        if (result !== null) {
            wins.push(result);
        }
    }
    return wins;
}

export function totalPayout(wins) {
    let total = 0;
    for (const win of wins) {
        total += win.payout;
    }
    return total;
}

export function formatWins(wins) {
    if (wins.length === 0) return 'Total wins: 0';
    let message = `Total wins: ${totalPayout(wins)}`;
    for (const win of wins) {
        message += `\n- payline ${win.paylineId}, ${win.symbol} x${win.count}, ${win.payout}`;
    }
    return message;
}

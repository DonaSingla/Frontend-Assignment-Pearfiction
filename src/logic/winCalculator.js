import { PAYLINES, PAYTABLE } from '../config/gameConfig.js';
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

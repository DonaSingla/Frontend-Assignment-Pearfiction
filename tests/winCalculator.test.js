import { describe, it, expect } from 'vitest';
import { checkPayline, calculateWins, totalPayout, formatWins } from '../src/logic/winCalculator.js';
import { PAYLINES } from '../src/config/gameConfig.js';

describe('checkPayline', () => {
    const middleRow = PAYLINES[0];

    it('returns null if less than 3 match', () => {
        const screen = [
            ['hv1','hv2','hv3','hv4','lv1'],
            ['hv1','hv1','hv2','hv3','hv4'],
            ['lv1','lv2','lv3','lv4','hv1'],
        ];
        expect(checkPayline(middleRow, screen)).toBeNull();
    });

    it('returns a win for 3 matching', () => {
        const screen = [
            ['lv1','lv2','lv3','lv4','hv1'],
            ['hv2','hv2','hv2','lv1','lv2'],
            ['lv1','lv2','lv3','lv4','hv1'],
        ];
        const win = checkPayline(middleRow, screen);
        expect(win).toEqual({ paylineId: 1, symbol: 'hv2', count: 3, payout: 5 });
    });

    it('returns a win for 5 matching', () => {
        const screen = [
            ['lv1','lv2','lv3','lv4','hv1'],
            ['hv1','hv1','hv1','hv1','hv1'],
            ['lv1','lv2','lv3','lv4','hv1'],
        ];
        const win = checkPayline(middleRow, screen);
        expect(win).toEqual({ paylineId: 1, symbol: 'hv1', count: 5, payout: 50 });
    });
});

describe('calculateWins', () => {
    it('finds 1 win for initial position', () => {
        const screen = [
            ['hv2','hv1','lv1','hv2','lv3'],
            ['lv3','lv2','hv2','lv2','lv4'],
            ['lv3','lv3','lv3','hv3','hv2'],
        ];
        const wins = calculateWins(screen);
        expect(totalPayout(wins)).toBe(1);
        expect(wins).toContainEqual({ paylineId: 3, symbol: 'lv3', count: 3, payout: 1 });
    });

    it('finds 2 wins in another screen', () => {
        const screen = [
            ['hv2','hv2','hv2','lv1','hv1'],
            ['lv3','lv1','lv3','hv1','lv2'],
            ['lv3','lv3','lv4','lv2','hv1'],
        ];
        const wins = calculateWins(screen);
        expect(totalPayout(wins)).toBe(6);
        expect(wins).toContainEqual({ paylineId: 2, symbol: 'hv2', count: 3, payout: 5 });
        expect(wins).toContainEqual({ paylineId: 5, symbol: 'lv3', count: 3, payout: 1 });
    });

    it('finds no wins for losing screen', () => {
        const screen = [
            ['lv3','lv2','lv3','lv3','lv3'],
            ['lv3','lv4','lv4','hv2','lv4'],
            ['hv1','lv3','hv3','lv1','hv2'],
        ];
        const wins = calculateWins(screen);
        expect(wins).toHaveLength(0);
        expect(totalPayout(wins)).toBe(0);
    });

    it('finds diagonal wins', () => {
        const screen = [
            ['lv1','hv1','lv1','hv1','lv1'],
            ['hv1','lv1','hv3','lv1','lv2'],
            ['lv1','lv2','lv1','hv1','hv4'],
        ];
        const wins = calculateWins(screen);
        expect(wins.find(w => w.paylineId === 6)).toBeTruthy();
        expect(wins.find(w => w.paylineId === 7)).toBeTruthy();
    });

    it('returns different payouts for different symbols', () => {
        const screen = [
            ['hv1','hv1','hv1','hv1','hv1'],
            ['lv1','lv1','lv1','lv1','lv1'],
            ['lv2','lv2','lv2','lv2','lv2'],
        ];
        const wins = calculateWins(screen);
        const hv1Win = wins.find(w => w.symbol === 'hv1');
        const lv1Win = wins.find(w => w.symbol === 'lv1');
        expect(hv1Win.payout).toBe(50);
        expect(lv1Win.payout).toBe(10);
    });
});

describe('totalPayout', () => {
    it('adds up payouts', () => {
        const wins = [
            { paylineId: 1, symbol: 'hv2', count: 3, payout: 5 },
            { paylineId: 3, symbol: 'lv3', count: 3, payout: 1 },
        ];
        expect(totalPayout(wins)).toBe(6);
    });

    it('returns 0 for no wins', () => {
        expect(totalPayout([])).toBe(0);
    });
});

describe('formatWins', () => {
    it('formats wins as text', () => {
        const wins = [
            { paylineId: 2, symbol: 'hv2', count: 3, payout: 5 },
            { paylineId: 5, symbol: 'lv3', count: 3, payout: 1 },
        ];
        const output = formatWins(wins);
        expect(output).toBe('Total wins: 6\n- payline 2, hv2 x3, 5\n- payline 5, lv3 x3, 1');
    });

    it('formats no wins', () => {
        expect(formatWins([])).toBe('Total wins: 0');
    });

    it('formats a big win', () => {
        const wins = [{ paylineId: 1, symbol: 'hv1', count: 5, payout: 50 }];
        const output = formatWins(wins);
        expect(output).toContain('Total wins: 50');
        expect(output).toContain('- payline 1, hv1 x5, 50');
    });
});

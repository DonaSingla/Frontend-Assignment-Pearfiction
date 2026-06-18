import { describe, it, expect } from 'vitest';
import { getColumnSymbols, buildScreen } from '../src/logic/reelLogic.js';

describe('getColumnSymbols', () => {
    it('returns top/mid/bot symbols at position 0 for reel 0', () => {
        expect(getColumnSymbols(0, 0)).toEqual(['hv2', 'lv3', 'lv3']);
    });

    it('wraps around the band correctly at the end', () => {
        // Band 1 has 20 elements; position 18 → indices 18, 19, 0
        expect(getColumnSymbols(0, 18)).toEqual(['lv3', 'hv2', 'hv2']);
    });

    it('wraps around for position 19', () => {
        // indices 19, 0, 1
        expect(getColumnSymbols(0, 19)).toEqual(['hv2', 'hv2', 'lv3']);
    });
});

describe('buildScreen', () => {
    it('matches the spec initial position [0,0,0,0,0]', () => {
        const screen = buildScreen([0, 0, 0, 0, 0]);
        expect(screen[0]).toEqual(['hv2', 'hv1', 'lv1', 'hv2', 'lv3']);
        expect(screen[1]).toEqual(['lv3', 'lv2', 'hv2', 'lv2', 'lv4']);
        expect(screen[2]).toEqual(['lv3', 'lv3', 'lv3', 'hv3', 'hv2']);
    });

    it('matches the spec example positions [18,9,2,0,12]', () => {
        const screen = buildScreen([18, 9, 2, 0, 12]);
        expect(screen[0]).toEqual(['lv3', 'hv4', 'lv3', 'hv2', 'lv2']);
        expect(screen[1]).toEqual(['hv2', 'lv3', 'lv4', 'lv2', 'hv4']);
        expect(screen[2]).toEqual(['hv2', 'hv2', 'hv3', 'hv3', 'hv1']);
    });

    it('produces a 3×5 grid', () => {
        const screen = buildScreen([0, 0, 0, 0, 0]);
        expect(screen).toHaveLength(3);
        screen.forEach(row => expect(row).toHaveLength(5));
    });
});

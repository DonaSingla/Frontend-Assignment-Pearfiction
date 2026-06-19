import * as PIXI from 'pixi.js';
import { buildScreen, randomPosition } from '../logic/reelLogic.js';
import { calculateWins, formatWins } from '../logic/winCalculator.js';
import { INITIAL_POSITIONS, COLS, ROWS } from '../config/gameConfig.js';

const TITLE_H = 50;
const CELL    = 100;
const MARGIN  = 4;
const PAD     = 20;
const GAP     = 10;
const BTN     = 80;
const W       = COLS * CELL + PAD * 2;
const H       = TITLE_H + PAD + ROWS * CELL + PAD + BTN + PAD + 100;

export class GameScene extends PIXI.Container {
    constructor(app, textures) {
        super();
        this.app = app;
        this.textures = textures;
        this.positions = [...INITIAL_POSITIONS];
        this._build();
        this._update();
        this.resize();
    }

    _build() {
        const gx = PAD;
        const gy = TITLE_H + PAD;
        const reelBottomY = gy + ROWS * CELL;

        const title = new PIXI.Text('Slot Machine', { fill: 0x222222, fontSize: 26, fontWeight: 'bold' });
        title.anchor.set(0.5, 0);
        title.x = W / 2;
        title.y = PAD;
        this.addChild(title);

        // reel area
        const bg = new PIXI.Graphics();
        bg.lineStyle(2, 0x999999)
          .beginFill(0xffffff)
          .drawRect(gx, gy, COLS * CELL, ROWS * CELL)
          .endFill();
        this.addChild(bg);

        // symbol sprites
        this._sprites = [];
        for (let row = 0; row < ROWS; row++) {
            this._sprites[row] = [];
            for (let col = 0; col < COLS; col++) {
                const s = new PIXI.Sprite(PIXI.Texture.EMPTY);
                s.x = gx + col * CELL + MARGIN;
                s.y = gy + row * CELL + MARGIN;
                this.addChild(s);
                this._sprites[row][col] = s;
            }
        }

        // spin button
        this._btn = new PIXI.Sprite(this.textures.spin_button);
        this._btn.anchor.set(0.5);
        this._btn.width  = BTN;
        this._btn.height = BTN;
        this._btn.x = W / 2;
        this._btn.y = reelBottomY + PAD + BTN / 2;
        this._btn.eventMode = 'static';
        this._btn.cursor = 'pointer';
        this._btn.on('pointerup',   () => this._spin());
        this._btn.on('pointerover', () => { this._btn.alpha = 0.7; });
        this._btn.on('pointerout',  () => { this._btn.alpha = 1; });
        this.addChild(this._btn);

        // win message
        this._winText = new PIXI.Text('', { fill: 0x222222, fontSize: 18, align: 'center' });
        this._winText.anchor.set(0.5, 0);
        this._winText.x = W / 2;
        this._winText.y = reelBottomY + PAD + BTN + GAP;
        this.addChild(this._winText);
    }

    _spin() {
        for (let i = 0; i < this.positions.length; i++) {
            this.positions[i] = randomPosition(i);
        }
        this._update();
    }

    _update() {
        const screen = buildScreen(this.positions);
        const size = CELL - MARGIN * 2;
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const tex = this.textures[screen[row][col]];
                this._sprites[row][col].texture = tex;
                if (tex && tex.width > 0) {
                    this._sprites[row][col].scale.set(size / tex.width, size / tex.height);
                }
            }
        }
        this._winText.text = formatWins(calculateWins(screen));
    }

    resize() {
        const { width: vw, height: vh } = this.app.screen;
        const scale = Math.min(vw / W, vh / H) * 0.92;
        this.scale.set(scale);
        this.x = Math.round((vw - W * scale) / 2);
        this.y = Math.round((vh - H * scale) / 2);
    }
}

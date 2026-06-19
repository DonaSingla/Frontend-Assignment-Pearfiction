import * as PIXI from 'pixi.js';
import { ASSETS } from './config/gameConfig.js';
import { GameScene } from './scenes/GameScene.js';

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 0xf0f0f0,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
});
document.body.appendChild(app.view);

// Show loading text while assets load
const loadText = new PIXI.Text('Loading... 0%', { fill: 0x333333, fontSize: 28 });
loadText.anchor.set(0.5);
loadText.x = app.screen.width / 2;
loadText.y = app.screen.height / 2;
app.stage.addChild(loadText);

// Load each asset one by one and update the percentage
const textures = {};
const assetList = Object.entries(ASSETS);
await new Promise(r => requestAnimationFrame(r));
for (let i = 0; i < assetList.length; i++) {
    const [name, url] = assetList[i];
    textures[name] = await PIXI.Assets.load(url);
    loadText.text = `Loading... ${Math.round(((i + 1) / assetList.length) * 100)}%`;
    await new Promise(r => requestAnimationFrame(r));
}

app.stage.removeChild(loadText);

const game = new GameScene(app, textures);
app.stage.addChild(game);

window.addEventListener('resize', () => game.resize());

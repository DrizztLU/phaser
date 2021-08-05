import * as Phaser from 'phaser';
import { Player } from './entities/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
  };
  
export class GameScene extends Phaser.Scene {

    entities: Phaser.Physics.Arcade.Sprite[] = []

    constructor() {
        super(sceneConfig);
    }

    public preload(){

        this.load.spritesheet('player', 'assets/sprites/bnm.png', {frameWidth: 24, frameHeight: 24});
        this.load.image("game-tiles", "assets/tiles/grass.png");
    }

    public create() {
        let level:number[][] = [];

        for (let x = 0; x < 2000; x++) {
            level[x] = []
            for (let y = 0; y < 2000; y++) {
                level[x].push(Math.floor((Math.random()*10%3)))
            }
        }
        let map = this.make.tilemap({ data: level, tileWidth: 24, tileHeight: 24 });
        let tiles = map.addTilesetImage("game-tiles");
        let layer = map.createLayer(0, tiles, 0, 0);

        let player = new Player(this, 200,200);

        this.entities.push(player);
        this.cameras.main.startFollow(player);
    }

    public update() {
    }
}
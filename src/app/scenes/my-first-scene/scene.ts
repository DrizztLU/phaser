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
    }

    public create() {
        let player = new Player(this, 200,200);

        this.entities.push(player);
        this.cameras.main.startFollow(player);
    }

    public update() {
    }
}
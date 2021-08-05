import * as Phaser from 'phaser';
import { WorldModel } from 'src/app/models/world.model';
import { WorldBuilderTypeEnum } from 'src/app/services/world-builder-type.enum';
import { WorldBuilderService } from 'src/app/services/world-builder.service';
import { Player } from './entities/player';
import { Tree } from './static-entities/tree';
import { AppModule } from 'src/app/app.module';
import { Injectable } from '@angular/core';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
  };
  
export class GameScene extends Phaser.Scene {

    wb: WorldBuilderService = new WorldBuilderService();

    entities: Phaser.Physics.Arcade.Sprite[] = []
    staticEntities: Phaser.Physics.Arcade.Sprite[] = []
    animatedTiles: any[] = [];
    world!: WorldModel;

    constructor() {
        super(sceneConfig);

    }

    public preload(){
        this.world = this.wb.GenerateWorld(WorldBuilderTypeEnum.Wilderness);
        this.load.image("game-tiles", "assets/tilesets/"+ this.world.tileset +".png");

        this.load.spritesheet('player', 'assets/sprites/bnm.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet("tree", 'assets/sprites/tree.png', {frameWidth: 24, frameHeight: 24})
    }

    public create() {

        let map = this.make.tilemap({ data: this.world.getGrid(), tileWidth: 24, tileHeight: 24 });
        let tiles = map.addTilesetImage("game-tiles");
        let bottomLayer = map.createLayer(0, tiles, 0, 0);
        bottomLayer.depth = -10;

        map.forEachTile((t) => {
                let seed = Math.random();
                let rotationInDegree = (Math.floor(seed * 100) % 4) * 90;
                t.rotation = rotationInDegree * (Math.PI / 180);
            } 
        ); 

        let player = new Player(this, 200,200);

        this.entities.push(player);
        this.cameras.main.startFollow(player);

        this.physics.add.collider(this.entities, this.staticEntities);
    }

    public update(time: number, delta: number) {
        this.animatedTiles.forEach(tile => tile.update(delta));
    }
}
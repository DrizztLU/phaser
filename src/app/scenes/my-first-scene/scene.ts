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

        this.createMap();
        this.createEntities();
        
    }

    public update(time: number, delta: number) {
        this.animatedTiles.forEach(tile => tile.update(delta));
    }

    private createMap() {
        let map = this.make.tilemap({ data: this.world.getGrid(), tileWidth: 24, tileHeight: 24 });
        let tiles = map.addTilesetImage("game-tiles");
        let bottomLayer = map.createLayer(0, tiles, 0, 0);
        bottomLayer.depth = -10;

        this.physics.world.setBounds(0, 0, this.world.getGrid().length, this.world.getGrid().length)

        map.forEachTile((t) => {
                let seed = Math.random();
                let rotationInDegree = (Math.floor(seed * 100) % 4) * 90;
                t.rotation = rotationInDegree * (Math.PI / 180);
            } 
        ); 
    }

    private createEntities(){
        let worldWidth = this.world.getGrid().length;
        let worldLength = this.world.getGrid().length;
        let treeCount = 100;

        let treeGrid = [];

        // Hardcoded sprite size
        for (let x = 0; x < worldWidth / 24; x++) {
            treeGrid[x] = new Array<number>();
            for (let y = 0; y < worldLength / 24; y++) {
                treeGrid[x][y] = 0;
            }
        }

        let player = new Player(this, 200,200);
        
        this.entities.push(player);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, 0, worldWidth, worldLength);

        for (let index = 0; index < treeCount; index++) {

            let position = this.generateRandomPositionInScene();

            if(treeGrid[Math.floor(position.posX / 24)][Math.floor(position.posY / 24)] == 0){
                let tree = new Tree(this, position.posX, position.posY)
                this.staticEntities.push(tree);
            }
            else {
                index--;
            }
        }

        this.physics.add.collider(this.entities, this.staticEntities);
    }

    private generateRandomPositionInScene(): {posX:number, posY:number}{
        let worldWidth = this.world.getGrid().length;
        let worldLength = this.world.getGrid().length;

        let posX = Math.floor(Math.random() * worldWidth);
        let posY = Math.floor(Math.random() * worldLength);

        return { posX: posX, posY: posY};
    }
}
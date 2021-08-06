import { AfterViewInit, ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import * as Phaser from 'phaser'
import { GameScene } from './scenes/my-first-scene/scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    title = 'game';
    gameConfig!: Phaser.Types.Core.GameConfig;
    game!: Phaser.Game

    constructor(){
        this.gameConfig = {
            title: 'Sample',
    
            type: Phaser.AUTO,
    
            scale: {
                width: 1000,
                height: 800,
            },
    
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    fps: 60,
                    
                },
            },
            parent: 'game',
            backgroundColor: '#000000',
            scene: GameScene,
        };
    }

    ngAfterViewInit(): void {
        this.game = new Phaser.Game(this.gameConfig);
        
    }



    
 
}

export class Tree extends Phaser.Physics.Arcade.Sprite {
    
    public body!:Phaser.Physics.Arcade.StaticBody;

    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene, x, y, "tree", Math.floor(Math.random()*100 % 3))
        
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }
}
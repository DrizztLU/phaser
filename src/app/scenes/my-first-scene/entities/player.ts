export class Player extends Phaser.Physics.Arcade.Sprite {
    

    constructor(scene: Phaser.Scene, x:number, y:number){
        super(scene, x, y, "player", 0)
        
        this.anims.create({
            key: 'move',
            duration: 500,
            frames: this.anims.generateFrameNumbers("player", {start:1, end:2}),
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers("player", {start:0, end:0}),
            repeat: 0
        });
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.events.on('update', this.update, this);
    }

    

    public update() {
        const cursorKeys = this.scene.input.keyboard.createCursorKeys();
 
        let noXMovement: boolean = false;
        let noYMovement: boolean = false;

        if (cursorKeys.up.isDown) {
            this.setVelocityY(-300);
            this.angle = -90;
            this.play('move', true);
        } else if (cursorKeys.down.isDown) {
            this.setVelocityY(300);
            this.angle = 90;
            this.play('move', true);
        } else {
            this.setVelocityY(0);
            noYMovement = true;
        }
        
        if (cursorKeys.right.isDown) {
            this.setVelocityX(300);
            this.angle = 0;
            this.play('move', true);
        } else if (cursorKeys.left.isDown) {
            this.setVelocityX(-300);
            this.angle = 180;
            this.play('move', true);
        } else {
            
            this.setVelocityX(0);
            noXMovement = true;
        }

        if(noXMovement && noYMovement){
            this.setVelocity(0);
            this.play('idle', true);
        }

        console.log(this.x, this.y)
    }
}
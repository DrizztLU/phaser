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

        let xVelocity = 0;
        let yVelocity = 0;

        if (cursorKeys.up.isDown) {
            yVelocity = -300;
            this.resetFlip();
            this.play('move', true);
        } else if (cursorKeys.down.isDown) {
            yVelocity = 300;
            this.setFlipX(true);
            this.play('move', true);
        } else {
            this.setVelocityY(0);
            noYMovement = true;
        }
        
        if (cursorKeys.right.isDown) {
            xVelocity = 300;
            this.resetFlip();
            this.play('move', true);
        } else if (cursorKeys.left.isDown) {
            xVelocity = -300;
            this.setFlipX(true);
            this.play('move', true);
        } else {
            
            this.setVelocityX(0);
            noXMovement = true;
        }

        if(noXMovement && noYMovement){
            this.setVelocity(0);
            this.play('idle', true);
        }
        else if (!noXMovement && !noYMovement){
            
            this.setVelocityX(xVelocity * 0.60);
            this.setVelocityY(yVelocity * 0.60);
        }
        else {
            this.setVelocityX(xVelocity);
            this.setVelocityY(yVelocity);
        }
    }
}
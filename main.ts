scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . 1 1 1 1 1 1 1 . . . . . . . .
    . f f f 1 . . . . . . . . . . .
    . . . . 1 . . . . . . . . . . .
    . . . . 1 . . . . . . . . . . .
    . . . . 1 . . . . . . . . . . .
    . . . 2 1 1 . . 1 1 1 1 1 . . .
    . 2 2 5 1 1 1 1 1 1 1 1 f 1 . .
    . 2 5 5 1 f f f f f 1 1 1 1 1 1
    . . 2 2 1 . . . . . f f f f f f
    . . . f 1 . . . . . . . . . . .
    . . . f 1 . . . . . . . . . . .
    . . . f 1 . . . . . . . . . . .
    . . . f 1 . . . . . . . . . . .
    . 1 1 1 1 1 1 1 . . . . . . . .
    . f f f f f f f . . . . . . . .
`, SpriteKind.Player)
info.setLife(5)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . 1 . . . . 1 . . . . . . . .
            . 2 1 1 1 1 1 1 1 1 . . . . . .
            2 5 1 1 1 1 1 1 1 1 1 1 1 1 2 2
            . 2 1 . . . . 1 . . . . . . . .
            . . 1 . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(100, function on_update() {
    let bogy1 = sprites.create(assets.image`bogy1`, SpriteKind.Enemy)
    bogy1.setVelocity(-30, randint(-30, 30))
    bogy1.y = randint(0, scene.screenHeight())
    bogy1.left = scene.screenWidth()
    bogy1.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})

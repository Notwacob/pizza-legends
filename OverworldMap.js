class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.widthGrid(10.5) - cameraPerson.x, utils.widthGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.widthGrid(10.5) - cameraPerson.x, utils.widthGrid(6) - cameraPerson.y)
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.widthGrid(5),
                y: utils.widthGrid(6),
                src: "images/characters/people/hero.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            npc1: new Person({
                x: utils.widthGrid(7),
                y: utils.widthGrid(9),
                src: "images/characters/people/npc1.png",
                useShadow: true
            })
        }
    },
    Kitchen: {
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                x: 3,
                y: 5,
                src: "images/characters/people/hero.png",
                useShadow: true
            }),
            npc1: new Person({
                x: 9,
                y: 6,
                src: "images/characters/people/npc1.png",
                useShadow: true
            }),
            npc2: new Person({
                x: 10,
                y: 8,
                src: "images/characters/people/npc2.png",
                useShadow: true
            })
        }
    },
}
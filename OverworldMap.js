class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

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

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach(object => {

            // TODO: determine if this object should actually mount

            object.mount(this);
        });
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "images/maps/DemoLower.png",
        upperSrc: "images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.widthGrid(5),
                y: utils.widthGrid(7),
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
        },
        walls: {
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
            [utils.asGridCoord(1,3)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(3,3)] : true,
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(6,4)] : true,
            [utils.asGridCoord(7,2)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(8,4)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(11,5)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(11,7)] : true,
            [utils.asGridCoord(11,8)] : true,
            [utils.asGridCoord(11,9)] : true,
            [utils.asGridCoord(10,10)] : true,
            [utils.asGridCoord(9,10)] : true,
            [utils.asGridCoord(8,10)] : true,
            [utils.asGridCoord(7,10)] : true,
            [utils.asGridCoord(6,10)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(4,10)] : true,
            [utils.asGridCoord(3,10)] : true,
            [utils.asGridCoord(2,10)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(0,9)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(0,5)] : true,
            [utils.asGridCoord(0,4)] : true,
        }
    },
    Kitchen: {
        lowerSrc: "images/maps/KitchenLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.widthGrid(3),
                y: utils.widthGrid(5),
                src: "images/characters/people/hero.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            npc1: new Person({
                x: utils.widthGrid(9),
                y: utils.widthGrid(6),
                src: "images/characters/people/npc1.png",
                useShadow: true
            }),
            npc2: new Person({
                x: utils.widthGrid(10),
                y: utils.widthGrid(8),
                src: "images/characters/people/npc2.png",
                useShadow: true
            })
        },
        walls: {
            [utils.asGridCoord(1,3)] : true,
            [utils.asGridCoord(2,3)] : true,
            [utils.asGridCoord(3,3)] : true,
            [utils.asGridCoord(4,3)] : true,
            [utils.asGridCoord(5,3)] : true,
            [utils.asGridCoord(6,3)] : true,
            [utils.asGridCoord(7,3)] : true,
            [utils.asGridCoord(8,3)] : true,
            [utils.asGridCoord(9,3)] : true,
            [utils.asGridCoord(10,3)] : true,
            [utils.asGridCoord(11,4)] : true,
            [utils.asGridCoord(12,4)] : true,
            [utils.asGridCoord(13,5)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(13,7)] : true,
            [utils.asGridCoord(13,8)] : true,
            [utils.asGridCoord(13,9)] : true,
            [utils.asGridCoord(12,10)] : true,
            [utils.asGridCoord(11,10)] : true,
            [utils.asGridCoord(10,9)] : true,
            [utils.asGridCoord(9,9)] : true,
            [utils.asGridCoord(10,7)] : true,
            [utils.asGridCoord(9,7)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(6,7)] : true,
            [utils.asGridCoord(8,10)] : true,
            [utils.asGridCoord(7,10)] : true,
            [utils.asGridCoord(6,10)] : true,
            [utils.asGridCoord(5,11)] : true,
            [utils.asGridCoord(4,10)] : true,
            [utils.asGridCoord(3,10)] : true,
            [utils.asGridCoord(2,9)] : true,
            [utils.asGridCoord(1,9)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(1,7)] : true,
            [utils.asGridCoord(1,6)] : true,
            [utils.asGridCoord(1,5)] : true,
            [utils.asGridCoord(0,4)] : true,
        }
    },
}
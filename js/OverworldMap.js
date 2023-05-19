class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.widthGrid(10.5) - cameraPerson.x, utils.widthGrid(6) - cameraPerson.y)
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.widthGrid(10.5) - cameraPerson.x, utils.widthGrid(6) - cameraPerson.y)
    }

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            // TODO: determine if this object should actually mount

            object.mount(this);
        });
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        //Reset NPCs to do their idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events)
        }
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.widthGrid(5),
                y: utils.widthGrid(6),
                src: "/images/characters/people/hero.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            npc1: new Person({
                x: utils.widthGrid(7),
                y: utils.widthGrid(9),
                src: "/images/characters/people/npc1.png",
                useShadow: true,
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800 },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 300 },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "I'm busy...", faceHero: "npc1" },
                            { type: "textMessage", text: "Go away!" },
                            { who: "hero", type: "walk", direction: "up" },
                        ]
                    }
                ]
            }),
            npc2: new Person({
                x: utils.widthGrid(8),
                y: utils.widthGrid(5),
                src: "/images/characters/people/npc2.png",
                useShadow: true,
            })
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(11, 5)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(11, 8)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(10, 10)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(0, 9)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(0, 4)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 4)]: [
                {
                    events: [
                        { who: "npc2", type: "walk", direction: "left" },
                        { who: "npc2", type: "stand", direction: "up", time: 500 },
                        { type: "textMessage", text: "You can't be in there!" },
                        { who: "npc2", type: "walk", direction: "right" },
                        { who: "hero", type: "walk", direction: "down" },
                        { who: "hero", type: "walk", direction: "left" },
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        { type: "changeMap", map: "Kitchen" }
                    ]
                }
            ],
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                x: utils.widthGrid(5),
                y: utils.widthGrid(5),
                src: "/images/characters/people/hero.png",
                useShadow: true,
                isPlayerControlled: true
            }),
            npc3: new Person({
                x: utils.widthGrid(10),
                y: utils.widthGrid(8),
                src: "/images/characters/people/npc3.png",
                useShadow: true,
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "You made it!", faceHero: "npc3" },
                        ]
                    }
                ]
            }),
        },
        walls: {
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(13, 5)]: true,
            [utils.asGridCoord(13, 6)]: true,
            [utils.asGridCoord(13, 7)]: true,
            [utils.asGridCoord(13, 8)]: true,
            [utils.asGridCoord(13, 9)]: true,
            [utils.asGridCoord(12, 10)]: true,
            [utils.asGridCoord(11, 10)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(10, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(0, 4)]: true,
        }
    },
}
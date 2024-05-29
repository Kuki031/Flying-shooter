'use strict'

import { Player } from './Player.js';
import { Projectile } from './Projectile.js';
import { Enemy } from './Enemy.js';
import { Field } from './Field.js';

export class Game {

    static instance;
    constructor() {
        if (Game.instance) return;
        Game.instance = this;
        this.#runGame().#clearDOM();
    }

    #runGame(playerX, playerY, projectile) {
        const gameField = new Field();
        const player = new Player();
        gameField.element.appendChild(player.publicEl);
        player._readCoordinates()._spawnOnScreen()._moveOnField();

        setInterval(() => {
            playerX = player.xcoords;
            playerY = player.ycoords;
        }, 1)

        window.addEventListener('keyup', (e) => {
            if (e.key === " ") {
                projectile = new Projectile('projectile')._spawnOnScreen(player.xcoords + (player.coords.width / 2.2), player.ycoords);
                projectile.width = projectile.publicEl.getBoundingClientRect().width;
                projectile.height = projectile.publicEl.getBoundingClientRect().height;
            }
        });
        setInterval(() => {
            const enemy = new Enemy('enemy');
            const enemyWidth = enemy.coords.width;
            enemy
                ._spawnOnScreen(
                    Math.floor(Math.random() * (gameField.element.getBoundingClientRect().width - enemyWidth)),
                    Math.floor(Math.random() * gameField.element.getBoundingClientRect().height / 4)
                )
                ._startMoving();
            setInterval(() => {
                enemy._detectCollision(playerX, playerY, player.coords.width, player.coords.height);
            }, 1)
            setInterval(() => {
                const projectileClone = { ...projectile };
                enemy._detectCollision(projectileClone.xPos, projectileClone.yPos, projectileClone.width, projectileClone.height);
            }), 1;
        }, 1000)

        return this;
    }

    #clearDOM() {
        setInterval(() => {
            const enemies = Array.from(document.querySelectorAll('.enemy'));
            for (let i = 0; i < enemies.length; i++) {
                if (enemies[i].classList.contains('hidden')) {
                    enemies[i].parentElement.removeChild(enemies[i]);

                } else continue;
            }
        }, 2000);
        return this;
    }
}
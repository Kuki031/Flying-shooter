'use strict'

export class Projectile {

    #element
    #projectileSpeed = 40;
    #startInterval;
    constructor(cssClass) {
        this.#element = document.createElement('div');
        this.#element.classList.add(cssClass);
        this.#element.textContent = '|';
        document.querySelector('.field').appendChild(this.#element);
        this._startMoving();
    }
    _spawnOnScreen(xpos, ypos) {
        this.#element.style.transform = `translate(${xpos}px, ${ypos}px)`;
        this.xPos = xpos;
        this.yPos = ypos;
        return this;
    }
    _startMoving() {
        this.#startInterval = setInterval(() => {
            this._detectCollisionWithBoard(this.yPos < -this.#element.parentElement.getBoundingClientRect().height, this.#startInterval);
            this.yPos -= this.#projectileSpeed;
            this.#element.style.transform = `translate(${this.xPos}px, ${this.yPos}px)`;
        }, 50);
        return this;
    }
    _detectCollisionWithBoard(destroyCondition, interval) {
        if (destroyCondition) {
            clearInterval(interval);
            this.#element.parentElement.removeChild(this.#element);
        }
        return this;
    }

    get publicEl() {
        return this.#element;
    }
}
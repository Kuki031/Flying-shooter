'use strict'

export class Enemy {
    #element
    #enemyObjectSpeed = 20;
    #yPos;
    #xPos;
    #startInterval;
    constructor(cssClass) {
        this.#element = document.createElement('div');
        this.#element.classList.add(cssClass);
        this.#element.textContent = '⚫';
        document.querySelector('.field').appendChild(this.#element);
        this.coords = this.#element.getBoundingClientRect();
    }

    _spawnOnScreen(xpos, ypos) {
        this.#element.style.transform = `translate(${xpos}px, ${ypos}px)`;
        this.#xPos = xpos;
        this.#yPos = ypos;
        return this;
    }
    _startMoving() {
        this.#startInterval = setInterval(() => {
            this.#yPos += this.#enemyObjectSpeed;
            this.#element.style.transform = `translate(${this.#xPos}px, ${this.#yPos}px)`;
        }, 100);
        return this;
    }

    _detectCollision(objectX, objectY, objectHeight, objectWidth) {
        if (!this.#element.classList.contains('hidden')) {
            if (this.#xPos < objectX + objectWidth &&
                this.#xPos + this.coords.width > objectX &&
                this.#yPos < objectY + objectHeight &&
                this.#yPos + this.coords.height > objectY) {
                this.#element.classList.add('hidden');
                clearInterval(this.#startInterval);
            }
            if (this.#yPos > this.#element.parentElement.getBoundingClientRect().height) this.#element.classList.add('hidden');
        }
        return this;
    }
}
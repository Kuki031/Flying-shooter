'use strict'

export class Player {
    #initialX;
    #initialY;
    #element;
    #playerVelocity = 40;
    constructor() {
        this.#element = document.createElement('div');
        this.#element.classList.add('player');
        this.#element.textContent = '🛦';
        this.#createPlayerPositionDisplay(this.#initialX, this.#initialY);
        this.#updatePlayerPositionDisplay();
    }

    get publicEl() {
        return this.#element;
    }

    #createPlayerPositionDisplay(xpos, ypos) {
        const html = `
            <div class="player-position">
            <p class="text">X: <span class="text__span--xposition">${xpos}</span></p>
            <p class="text">Y: <span class="text__span--yposition">${ypos}</span></p>
            </div>
        `
        document.querySelector('.field').insertAdjacentHTML('beforeend', html);
    }

    _readCoordinates() {
        this.coords = this.#element.getBoundingClientRect();
        return this;
    }

    #updatePlayerPositionDisplay() {
        document.querySelector('.text__span--xposition').textContent = this.#initialX;
        document.querySelector('.text__span--yposition').textContent = this.#initialY;
    }

    _setStartPoint() {
        this.#initialX = Math.floor(this.#element.parentElement.getBoundingClientRect().width / 2);
        this.#initialY = Math.floor(this.#element.parentElement.getBoundingClientRect().height - (this.coords.height) * 2);
        return this;
    }

    _spawnOnScreen() {
        this.#element.style.transform = `translate(${this.#element.parentElement.getBoundingClientRect().width / 2}px, ${this.#element.parentElement.getBoundingClientRect().height - (this.coords.height) * 2}px)`;
        this._setStartPoint();

        return this;
    }

    _moveOnField() {
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            const key = e.key;
            this._detectCollisionWithBoard();
            this.#updatePlayerPositionDisplay();
            switch (key) {
                case "ArrowLeft":
                    this.#initialX -= this.#playerVelocity;
                    this.#element.style.transform = `translate(${this.#initialX}px, ${this.#initialY}px)`;
                    break;
                case "ArrowRight":
                    this.#initialX += this.#playerVelocity;
                    this.#element.style.transform = `translate(${this.#initialX}px, ${this.#initialY}px)`;
                    break;
                case "ArrowUp":
                    this.#initialY -= this.#playerVelocity;
                    this.#element.style.transform = `translate(${this.#initialX}px, ${this.#initialY}px)`;
                    break;
                case "ArrowDown":
                    this.#initialY += this.#playerVelocity;
                    this.#element.style.transform = `translate(${this.#initialX}px, ${this.#initialY}px)`;
                    break;
                default: 0
                    break;
            }
        })
        return this;
    }

    _detectCollisionWithBoard() {
        if (this.#initialX + (this.coords.width * 1.5) >= this.#element.parentElement.getBoundingClientRect().width) this.#initialX -= this.#playerVelocity;
        if (this.#initialX + (this.coords.width * .5) < this.coords.width) this.#initialX += this.#playerVelocity;
        if (this.#initialY + this.coords.height * 1.5 > this.#element.parentElement.getBoundingClientRect().height) this.#initialY -= this.#playerVelocity;
        if (this.#initialY < this.coords.height * .5) this.#initialY += this.#playerVelocity;
        return this;
    }
    get xcoords() {
        return this.#initialX;
    }

    get ycoords() {
        return this.#initialY;
    }
}
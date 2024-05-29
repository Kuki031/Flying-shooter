'use strict'

export class Field {

    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('field');
        document.body.appendChild(this.element);
    }
}
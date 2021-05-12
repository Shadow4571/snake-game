/**
 * Класс змейки.
 */
class Snake {
    constructor(mapX, mapY, length) {
        this._head = new SnakePart(mapX, mapY, true, undefined, "#ffffff", Direction.UP);
        this._tail = this._head;
        this._body = [this._head];
        this._velocity = new Vector(0, -1);
        this._oldVelocity = new Vector(0, -1);
        this._diagonalSide = false;
        this.isAlive = true;
        this.isPlayerControl = true;
        this._ai = null;

        while (--length > 0) {
            this.addSnakePart();
        }

        console.log("LOAD CLASS: " + this.constructor.name);
    }

    // Возвращает длинну змейки
    length() {
        return this._body.length;
    }

    /**
     * Присоеденить ИИ к змейке и переключить управление с игрока на ИИ.
     * @param ai - ИИ.
     * @returns {Snake}
     */
    appendAI(ai) {
        this._ai = ai.__proto__ === AI.prototype ? ai : null;
        this.isPlayerControl = this._ai === null;
        return this;
    }

    /**
     * Добавить новую часть змейки в конец.
     */
    addSnakePart() {
        let lastPart = new SnakePart(this._tail.oldX, this._tail.oldY, false, this._tail, "#ffffff", this._tail.direction);
        lastPart.isTail = true;
        this._tail.isTail = false;
        this._tail = lastPart;
        this._body.push(lastPart);
    }

    // Получить координаты головы змейки
    getSnakeHeadCoordinates() {
        return {x: this._head.mapX, y: this._head.mapY};
    }

    // Получить координаты хвоста змейки
    getSnakeTailCoordinates() {
        return {x: this._tail.mapX, y: this._tail.mapY};
    }

    // Получить координаты всех частей змейки
    getSnakePartsCoordinates() {
        let result = [];

        for(let part of this._body) {
            result.push({x: part.mapX, y: part.mapY});
        }

        return result;
    }

    /**
     * Проверить коллизию змейки с самой собой.
     * @param x - координата x.
     * @param y - координата y.
     * @returns {boolean} - результат коллизии.
     * @private
     */
    _checkSelfCollision(x, y) {
        for(let i = 1; i < this._body.length; i++) {
            if(x === this._body[i].mapX && y === this._body[i].mapY) {
                return true;
            }
        }

        return false;
    }

    /**
     * Передвинуть змейку.
     * Метод обрабатывает вектор движения из управления игрока или из ИИ и передвигает части змейки.
     */
    moveSnake() {
        if(!this.isAlive) {
            return;
        }

        if(!this.isPlayerControl) {
            this._ai.getNextCoordinateFromPath();
        }

        if(checkOppositeDirectionFromVectors(this._velocity, this._oldVelocity)) {
            this._velocity.x = this._oldVelocity.x;
            this._velocity.y = this._oldVelocity.y;
        }

        if(this._velocity.x !== 0 && this._velocity.y !== 0) {
            if(this._diagonalSide) {
                this._velocity.y = 0;
            } else {
                this._velocity.x = 0;
            }

            this._diagonalSide = !this._diagonalSide;
        }

        this._oldVelocity.x = this._velocity.x;
        this._oldVelocity.y = this._velocity.y;

        let x = this._head.mapX + this._velocity.x;
        let y = this._head.mapY + this._velocity.y;

        if(this._checkSelfCollision(x, y)) {
            this.isAlive = false;
        }

        for(let i = 0; i < this._body.length; i++) {
            this._body[i].movePart(x, y);
        }
    }

    /**
     * Получает вектор движения из управления игрока или из ИИ.
     */
    update() {
        if(!this.isAlive) {
            return;
        }

        let velocity;
        if(this.isPlayerControl) {
            velocity = triggerSet.getAxisVector();
        } else {
            velocity = this._ai.getAxisVectorFromCurrentCoordinates();
        }

        if(velocity === null) {
            velocity = new Vector(this._velocity.x, this._velocity.y);
        }

        if(velocity.x === 0 && velocity.y === 0) {
            velocity.x = this._velocity.x;
            velocity.y = this._velocity.y;
        }

        this._velocity.x = velocity.x;
        this._velocity.y = velocity.y;

        for(let part of this._body) {
            part.update();
        }
    }

    /**
     * Отрисовывает все части змейки.
     */
    draw() {
        push();
        imageMode(CENTER);

        for(let part of this._body) {
            part.draw();
        }

        imageMode(CORNER);
        pop();
    }

    toString() {
        let result = this.constructor.name + " : snake length " + this._body.length + "\n";

        for(let i = 0; i < this._body.length; i++) {
            result += this._body[i].toString() + "\n";
        }

        return result;
    }
}
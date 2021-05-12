/**
 * Класс части змейки.
 * Содержит информацию является ли часть змейки головой, хвостом или телом.
 */
class SnakePart extends GameObject {
    /**
     * @param mapX - координата x на карте.
     * @param mapY - координата y на карте.
     * @param isHead - является ли часть головой.
     * @param parent - предок части.
     * @param color - цвет части.
     * @param direction - направление части.
     */
    constructor(mapX, mapY, isHead, parent, color, direction) {
        super(mapX, mapY, GameObjectType.SNAKE, true);
        this.oldX = mapX;
        this.oldY = mapY;
        this._isHead = isHead;
        this.isTail = false;
        this._parent = parent instanceof SnakePart && !isHead ? parent : null;
        this._color = color;
        this._texture = textureManager.getTexture(Snake_Body);
        this.direction = direction;
    }

    /**
     * Передвинуть часть змейки на координаты x, y.
     * Если часть не является головой, передвинуть на координату предка.
     * @param x - координата x на карте.
     * @param y - координата y на карте.
     */
    movePart(x, y) {
        this.oldX = this.mapX;
        this.oldY = this.mapY;

        if (!this._isHead) {
            x = this._parent.oldX;
            y = this._parent.oldY;
        }

        this.direction = getDirection(x, y, this.mapX, this.mapY);

        this._setMapCoordinate(x, y);
    }

    /**
     * Обнвляем текущую текстуру части змейки в зависимости от того, какой частью она является.
     */
    update() {
        if (this._isHead) {
            this._texture = textureManager.getTexture(Snake_Head);
        } else if (this.isTail) {
            this._texture = textureManager.getTexture(Snake_Tail);
        } else {
            this._texture = textureManager.getTexture(Snake_Body);
        }
    }

    /**
     * Отрисовать часть змейки в зависимости от направления змейки.
     * translate - устанавливает центр вращения на центр части змейки.
     * rotate - поворачивает текстуру на определенный угол.
     */
    draw() {
        translate(this._x + TILE_SIZE.WIDTH / 2, this._y + TILE_SIZE.HEIGHT / 2);
        let angle = 0;

        if (this.direction === Direction.DOWN) {
            angle = 180;
        }

        if (this.direction === Direction.LEFT) {
            angle = 270;
        }

        if (this.direction === Direction.RIGHT) {
            angle = 90;
        }

        rotate(PI / 180 * angle);
        image(this._texture, 0, 0);
        rotate(-PI / 180 * angle);
        translate(-(this._x + TILE_SIZE.WIDTH / 2), -(this._y + TILE_SIZE.HEIGHT / 2));
    }

    toString() {
        return "Snake part X: " + this.mapX + " Y: " + this.mapY + " | Is head: " + this._isHead;
    }
}
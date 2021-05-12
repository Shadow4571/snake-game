/**
 * Класс еды для змейки.
 * Реализует простую еду, содержащую только количество очков за съедение без дополнительных эффектов.
 */
class Food extends GameObject{
    constructor(mapX, mapY, color, score) {
        super(mapX, mapY, GameObjectType.FOOD, true);
        this._color = color;
        this.score = score;
        this._texture = textureManager.getTexture(Food_Apple);
    }

    update() {

    }

    draw() {
        image(this._texture, this._x, this._y);
    }
}
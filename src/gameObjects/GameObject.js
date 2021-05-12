const GameObjectType = {NONE: "None", WALL: "Wall", SNAKE: "Snake", FOOD: "Food"};

/**
 * Класс игрового объкта.
 * Содержит общие для всех объектов поля и методы.
 */
class GameObject {
    /**
     * @param mapX - координата x на карте.
     * @param mapY - координата y на карте.
     * @param gameObjectType - тип объекта.
     * @param isActive - активен ли объект (нужно ли его обновлять)
     */
    constructor(mapX, mapY, gameObjectType, isActive) {
        this.mapX = mapX;
        this.mapY = mapY;
        this._x = mapX * TILE_SIZE.WIDTH;
        this._y = mapY * TILE_SIZE.HEIGHT;
        this.type = gameObjectType;
        this.isActive = isActive.__proto__ === Boolean.prototype ? isActive : true;
    }

    /**
     * Установить координаты на карте с отображаемыми координатами.
     * @param mapX - координата x на карте.
     * @param mapY - координата y на карте.
     * @private
     */
    _setMapCoordinate(mapX, mapY) {
        this.mapX = mapX;
        this.mapY = mapY;
        this._x = mapX * TILE_SIZE.WIDTH;
        this._y = mapY * TILE_SIZE.HEIGHT;
    }

    update() {

    }

    draw() {

    }
}
/**
 * Класс менеджера еды для змейки.
 * Данный менеджер может спавнить еду на карте.
 */
class FoodsManager {
    constructor(foodTypes, foodsInfos) {
        this._foodsMap = new Map();
        this._allFood = [];

        for(let i = 0; i < foodTypes.length; i++) {
            this._foodsMap.set(foodTypes[i], foodsInfos[i]);
        }
    }

    // Вернуть количество еды на карте
    getFoodCount() {
        return this._allFood.length;
    }

    // Вернуть количество очков из еды по координатам
    getFoodScoreByCoordinates(x, y) {
        for(let food of this._allFood) {
            if(food.mapX === x && food.mapY === y) {
                return food.score;
            }
        }

        return 0;
    }

    // Венуть значение количества очков из еды по индексу
    getFoodScoreByIndex(index) {
        if(index < 0 || index >= this._allFood.length) {
            return 0;
        }

        return this._allFood[index].score;
    }

    // Вернуть координаты всей еды
    getFoodsCoordinates() {
        let result = [];

        for(let i = 0; i < this._allFood.length; i++) {
            result.push({x: this._allFood[i].mapX, y: this._allFood[i].mapY});
        }

        return result;
    }

    // Удалить всю еду
    removeAllFoods() {
        this._allFood = [];
        return true;
    }

    // Удилть еду по координатам
    removeFoodByCoords(x, y) {
        for(let i = 0; i < this._allFood.length; i++) {
            if(this._allFood[i].mapX === x && this._allFood[i].mapY === y) {
                this._allFood.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // Удалить еду по индексу
    removeFoodByIndex(index) {
        if(index < 0 || index > this._allFood.length - 1) {
            return false;
        }

        this._allFood.splice(index, 1);
        return true;
    }

    /**
     * Заспавнить еду по типу в пустых координахат.
     * @param foodType - тип еды, который необходимо заспавнить.
     * @param emptyCoordinates - свободные координаты.
     */
    spawnFoodByType(foodType, emptyCoordinates) {
        let coordinate = emptyCoordinates[(Math.random() * emptyCoordinates.length) ^ 0];
        let foodClass = this._foodsMap.get(foodType);
        this._allFood.push(new foodClass.foodConstructor(coordinate.x, coordinate.y, foodClass.foodColor, foodClass.foodScore));
    }

    update() {
        for(let food of this._allFood) {
            food.update();
        }
    }

    draw() {
        for(let food of this._allFood) {
            food.draw();
        }
    }
}
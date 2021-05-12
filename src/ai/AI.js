/**
 * Класс ИИ змейки.
 * Реализует управление змейкой по карте.
 */
class AI {
    /**
     * @param graphMap - карта граф.
     * @param snake - змейка.
     */
    constructor(graphMap, snake) {
        this._graphMap = graphMap;
        this._snake = snake;
        this._pathToFood = null;
        this._pathIndex = 0;
        this._hasPathToFood = false;
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    // Если у змейки нету пути до еды, пытаемся найти его.
    update(dynamicObjectWithCoordinates) {
        if(!this._hasPathToFood) {
            this.updatePathToFood(dynamicObjectWithCoordinates);
        }
    }

    /**
     * Находит и обновляет путь до еды.
     * Если пути не нашлось, переходим к режиму выживания, стараясь пройти самым длинным путем.
     * @param dynamicObjectWithCoordinates - динамические объекты с координатами, по ним будем искать еду.
     * @returns {boolean}
     */
    updatePathToFood(dynamicObjectWithCoordinates) {
        let check = true;
        let snakeHead = this._snake.getSnakeHeadCoordinates();
        // Создаем граф, на котором расположены все динамические объекты
        let dynamicGraph = this._graphMap.getGraphWithDynamicObjects(dynamicObjectWithCoordinates);
        // Создаем копию графа, на тот случай, если одним из вариантов не получилось найти еду
        let dynamicGraphCopy = createGraphCopy(dynamicGraph);

        // Получаем координаты еды
        let foodCoordinate = getFoodCoordinateFromDynamicObjects(dynamicObjectWithCoordinates);
        // Находим расстояние до еды
        let distance = foodCoordinate ? getDistanceBetweenCoordinates(snakeHead, foodCoordinate) : 0;
        // Проверить сколько частей змейки находятся рядом с едой
        let nearPartCount = countSnakePartNearToFood(dynamicObjectWithCoordinates);

        // Если рядом с едой меньше двух частей, значит еда не находится в тупике, можем найти путь учитывая расстояние
        // Если еда ближе, чем коэффицент расстояния с учетом длинны змейки, то идем самым длинным путем, иначе идем коротким
        if(nearPartCount < 2) {
            if (distance < 150 + this._snake.length() * 10 / 2) {
                this._pathToFood = this._graphMap.getPathFromDynamicGraphToFirstObjectTypeDFS(snakeHead.x, snakeHead.y, [GameObjectType.FOOD], dynamicGraph, true);
            } else {
                this._pathToFood = this._graphMap.getPathFromDynamicGraphToFirstObjectTypeBFS(snakeHead.x, snakeHead.y, [GameObjectType.FOOD], dynamicGraph);
            }
        }

        // Если найти путь до еды не удалось или еда находится в тупике - идем по самому длинному пути со свободными клетками
        // Если путь найден, присваиваем индекс текущей точки маршрута исключая начальную координату головы змейки
        if(this._pathToFood === null || nearPartCount > 1) {
            check = false;
            this._pathToFood = this._graphMap.getPathFromDynamicGraphToFirstObjectTypeDFS(snakeHead.x, snakeHead.y, [GameObjectType.NONE], dynamicGraphCopy, false);
        } else {
            this._pathIndex = this._pathToFood.length - 2;
        }

        this._hasPathToFood = check;
        return check;
    }

    /**
     * Получить следующую координату из пути.
     * @returns {null|*}
     */
    getNextCoordinateFromPath() {
        if(this._pathIndex-- <= 0) {
            this._hasPathToFood = false;
            return null;
        }

        return this._pathToFood[this._pathIndex];
    }

    /**
     * Получить текущую координату из пути.
     * @returns {null|*}
     */
    getCurrentCoordinateFromPath() {
        if(this._pathToFood === null) {
            return null;
        }

        return this._pathToFood[this._pathIndex];
    }

    // Получить вектор направления из следующей координаты
    getAxisVectorFromNextCoordinates() {
        return this.getAxisVectorFromInputCoordinates(this.getNextCoordinateFromPath());
    }

    // Получить вектор направления из текущей координаты
    getAxisVectorFromCurrentCoordinates() {
        return this.getAxisVectorFromInputCoordinates(this.getCurrentCoordinateFromPath());
    }

    // Получить вектор направления из заданной координаты
    getAxisVectorFromInputCoordinates(destination) {
        return getAxisVectorBetweenCoordinates(destination, this._snake.getSnakeHeadCoordinates())
    }
}
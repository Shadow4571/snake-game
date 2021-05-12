/**
 * Класс простого генератора событий для классической змейки.
 * Создает события на движение змейки, спавн еды и увеличение сложности по ходу игры (опционально)
 */
class SimpleSnakeEventsGenerator {
    /**
     * @param score - начальный счет.
     * @param moveDelay - задержка перед перемещением змейки.
     * @param changeDifficult - нужно ли изменять сложность (увеличивая скорость).
     */
    constructor(score, moveDelay, changeDifficult) {
        this._score = score;
        this._defaultDelay = moveDelay;
        this._moveDelay = moveDelay;
        this._changeDifficult = changeDifficult;
        this._lastMovedTime = 0;
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    init(startTime, deltaTime, snake, foodsManager, graphMap, ai) {
        foodsManager.spawnFoodByType(FoodType.SIMPLE, getEmptyCoordinatesOnMap(snake.getSnakePartsCoordinates()));
    }

    update(startTime, deltaTime, snake, foodsManager, graphMap, ai) {
        // Если змейка неактивна и в менеджере виджетов нету виджета окончания игры, заканчиваем игру
        // Если змейка заполнила всё поле - игра считается выйгранной, если нет - проигранной.
        if(!snake.isAlive && !widgetManager.hasWidgetInManager(WidgetType.END_GAME)) {
            let gameResult = snake.length === MAP_SIZE.WIDTH * MAP_SIZE.HEIGHT;
            soundManager.stopSound(Musics.GAME);
            soundManager.playSound(gameResult ? Sounds.END_GAME_WON : Sounds.END_GAME_LOSE);
            widgetManager.addWidgetToManager(WidgetType.END_GAME, new EndGameWidget(true, {mode: snake.isPlayerControl ? "Player" : "AI", score: this._score, time: deltaTime, message: gameResult ? "You won!" : "You lose!"}));
            widgetManager.addOverlayWidgetToViewport(WidgetType.END_GAME);
        }

        // Если прошло больше времени, чем необходимо по задержке движения, передвигаем змейку
        if(this._lastMovedTime + this._moveDelay < deltaTime) {
            snake.moveSnake();
            this._lastMovedTime = deltaTime;
        }

        let snakeHeadCoordinates = snake.getSnakeHeadCoordinates();

        // Если змейка вышла за пределы карты - проиграли
        if(snakeHeadCoordinates.x < 0 || snakeHeadCoordinates.y < 0 || snakeHeadCoordinates.x > MAP_SIZE.WIDTH || snakeHeadCoordinates.y > MAP_SIZE.HEIGHT) {
            snake.isAlive = false;
        }

        let foodCoordinate = foodsManager.getFoodsCoordinates()[0];

        // Если еды на карте нету, спавнив новую еду на свободных клетках
        if(foodCoordinate !== undefined && foodCoordinate.x === snakeHeadCoordinates.x && foodCoordinate.y === snakeHeadCoordinates.y) {
            soundManager.playSound(Sounds.EAT_SIMPLE);
            this._score += foodsManager.getFoodScoreByIndex(0);
            snake.addSnakePart();
            foodsManager.removeAllFoods();
            let tempEmptyCoords = getEmptyCoordinatesOnMap(snake.getSnakePartsCoordinates());

            foodsManager.spawnFoodByType(FoodType.SIMPLE, tempEmptyCoords);

            if(this._changeDifficult) {
                this._setDifficultFromScore();
            }
        }
    }

    /**
     * Установить сложность игры исходя из набранных очков.
     * @private
     */
    _setDifficultFromScore() {
        let result = this._defaultDelay - this._score;
        result = result < 0 ? 0 : result;

        this._moveDelay = result;
    }
}
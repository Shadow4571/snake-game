/**
 * Класс игрового состояния игры.
 * Инициализирует все необходимые классы для игры: змейку, менеджер еды, карту-граф, менеджер событий и ИИ.
 */
class GameState extends IGameState {
    constructor(stateInfo) {
        super(stateInfo);
        this._snake = null;
        this._foodsManager = null;
        this._eventsManager = null;
        this._graphMap = null;
        this._ai = null;
        this._useAI = false;
        this._isPause = false;
        this._lastPausePressed = Date.now();
        this.init();
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    init(initObject) {
        super.init();
        soundManager.stopAllSound();
        this._snake = new Snake(20, 20, 3);
        this._foodsManager = new FoodsManager([FoodType.SIMPLE], [new FoodInfo(Food, "#2dc03f", 10)]);
        this._graphMap = new GraphMap([]);
        this._ai = new AI(this._graphMap, this._snake);
        this._useAI = initObject ? initObject.ai : false;
        this._isPause = false;
        if(this._useAI) {
            this._snake.appendAI(this._ai);
        }
        this._eventsManager = new EventsManager(this._snake, this._foodsManager, this._graphMap, this._ai, new SimpleSnakeEventsGenerator(0, 50, false));
        this._ai.updatePathToFood([{objectType: GameObjectType.SNAKE, coordinates: this._snake.getSnakePartsCoordinates()}, {objectType: GameObjectType.FOOD, coordinates: this._foodsManager.getFoodsCoordinates()}]);
        widgetManager.setWidgetToViewport(WidgetType.GAME);
        soundManager.playSound(Musics.GAME);
    }

    update() {
        if((triggerSet.PAUSE && this._lastPausePressed + 450 < Date.now()) || (widgetManager.getDataFromWidget(WidgetType.GAME_PAUSE).unPause)) {
            this._lastPausePressed = Date.now();
            this._isPause = !this._isPause;
            widgetManager.sendDataToProcessInWidget({unPause: false});

            if(this._isPause) {
                widgetManager.setWidgetToViewport(WidgetType.GAME_PAUSE);
            } else {
                widgetManager.setWidgetToViewport(WidgetType.GAME);
            }
        }

        if(this._isPause) {
            return;
        }

        super.update();
        this._snake.update();
        this._eventsManager.update();
        this._foodsManager.update();
        if(this._useAI) {
            this._ai.update([{objectType: GameObjectType.SNAKE, coordinates: this._snake.getSnakePartsCoordinates()}, {objectType: GameObjectType.FOOD, coordinates: this._foodsManager.getFoodsCoordinates()}]);
        }
    }

    draw() {
        super.draw();
        this._graphMap.draw();
        this._foodsManager.draw();
        this._snake.draw();
    }
}
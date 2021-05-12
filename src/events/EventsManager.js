/**
 * Класс менеджера событий.
 * Управляет генераторами событий и при необходимости может переключать их.
 */
class EventsManager {
    /**
     * @param snake - змейка.
     * @param foodsManager - менеджер еды.
     * @param graphMap - карта-граф.
     * @param ai - ИИ.
     * @param eventsGenerator - генератор событий.
     */
    constructor(snake, foodsManager, graphMap, ai, eventsGenerator) {
        this._startTime = Date.now();
        this._deltaTime = 0;
        this._snake = snake;
        this._foodsManager = foodsManager;
        this._graphMap = graphMap;
        this._ai = ai;
        this.setEventsGenerator(eventsGenerator);
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    setEventsGenerator(eventsGenerator) {
        this._eventsGenerator = eventsGenerator;
        this._eventsGenerator.init(this._startTime, this._deltaTime, this._snake, this._foodsManager, this._graphMap, this._ai);
    }

    update() {
        this._deltaTime = Date.now() - this._startTime;
        this._eventsGenerator.update(this._startTime, this._deltaTime, this._snake, this._foodsManager, this._graphMap, this._ai);
    }
}
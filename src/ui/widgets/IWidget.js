const WidgetNone = {reloadWidget: function () {}, processData: function (processedObjects) {return false}, getData: function() {return null}, update: function () {}, draw: function () {}};

/**
 * "Интерфейс" виджетов. Реализует базовые методы, которые необходимы в каждом виджете.
 */
class IWidget {
    /**
     * @param widgetType - тип виджета.
     * @param reloadFromDefaults - необходимо ли производить инициализацию из значений по умолчанию (defaults).
     * @param defaults - значения по умолчанию.
     */
    constructor(widgetType, reloadFromDefaults, defaults) {
        this.widgetType = widgetType;
        this.defaults = (defaults !== null && defaults !== undefined && !defaults.isArray) ? defaults : null;
        this.reloadFromDefaults = reloadFromDefaults.__proto__ === Boolean.prototype ? reloadFromDefaults : false;
    }

    /**
     * Выполнить переоткрытие виджета.
     * @returns {*|boolean} - результат выполнения.
     */
    reloadWidget() {
        return this.reloadFromDefaults;
    }

    /**
     * Обработать входные данные.
     * @param processedObjects - входные данные.
     * @returns {boolean} - результат обработки входных данных.
     */
    processData(processedObjects) {
        return processedObjects !== null && processedObjects !== undefined;
    }

    /**
     * Вернуть данные из виджета.
     * @returns {null}
     */
    getData() {
        return null;
    }

    update() {

    }

    draw() {

    }
}
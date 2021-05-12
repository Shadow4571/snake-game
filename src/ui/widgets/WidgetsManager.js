const WidgetType = {NONE: "None", MENU: "Menu", OPTIONS: "Options", IN_GAME_OPTIONS: "In game options", END_GAME: "End game", GAME_SELECT: "Game select", GAME: "Game", GAME_PAUSE: "Game pause", CHANGE_KEY: "Change key", RECORDS: "Records"};

/**
 * Менеджер виджетов.
 * Позволяет выводить на экран виджеты пользовательского интерфейса.
 * Поддерживает наложение одного виджета поверх другого.
 */
class WidgetsManager {
    /**
     * @param widgetStartType - тип виджета, который покажется после инициализации.
     * @param widgets - набор виджетов (может быть пустым, тогда загрузятся виджеты по умолчанию)
     */
    constructor(widgetStartType, widgets) {
        this._widgetsMap = new Map();
        this._currentWidget = widgetStartType;
        this._overlayWidget = WidgetType.NONE;
        if(widgets === null || widgets === undefined || !widgets.isArray || widgets.length === 0) {
            this._loadDefaultWidgets();
        } else {
            if(!this._loadWidgets(widgets)) {
                this._loadDefaultWidgets();
            }
        }
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    /**
     * Добавить виджеты по умолчанию.
     * Добавляет пустой виджет, виджет меню, опций, рекордов, игровой.
     * @private
     */
    _loadDefaultWidgets() {
        this._widgetsMap.clear();

        this._widgetsMap.set(WidgetType.NONE, WidgetNone);
        this._widgetsMap.set(WidgetType.MENU, new MenuWidget(false, null));
        this._widgetsMap.set(WidgetType.OPTIONS, new OptionsWidget(true, {delegate: () => {widgetManager.setWidgetToViewport(WidgetType.MENU)}}));
        this._widgetsMap.set(WidgetType.IN_GAME_OPTIONS, new OptionsWidget(true, {delegate: () => {widgetManager.setWidgetToViewport(WidgetType.GAME_PAUSE)}}));
        this._widgetsMap.set(WidgetType.RECORDS, new RecordsWidget(true, null));
        this._widgetsMap.set(WidgetType.GAME_SELECT, new GameSelectWidget(false, null));
        this._widgetsMap.set(WidgetType.GAME_PAUSE, new GamePauseWidget(false, null));
        this._widgetsMap.set(WidgetType.GAME, new GameWidget(true, null));
    }

    /**
     * Добавить виджеты переданные во время инициализации менеджера.
     * @param widgets - список виджетов.
     * @returns {boolean} -
     * @private
     */
    _loadWidgets(widgets) {
        try {
            for(let widget of widgets) {
                if(widget instanceof IWidget) {
                    this._widgetsMap.set(widget.widgetType, widget);
                }
            }

            if (!this._widgetsMap.has(WidgetType.NONE)) {
                this._widgetsMap.set(WidgetType.NONE, WidgetNone)
            }
        } catch (exp) {
            this._widgetsMap.clear();
            return false;
        }

        return true;
    }

    /**
     * Добавить виджет в менеджер, для отображения.
     * @param widgetType - тип виджета.
     * @param widget - виджет.
     * @param showAfter - тип виджета, который следует показать после добавления нового виджета.
     * @returns {WidgetsManager}
     */
    addWidgetToManager(widgetType, widget, showAfter) {
        this._widgetsMap.set(widgetType, widget);

        if(showAfter) {
            this.setWidgetToViewport(widgetType);
        }

        return this;
    }

    /**
     * Удалить виджет из менеджера по его типу.
     * @param widgetType - тип виджета.
     * @param widgetTypeShowingAfterRemoving - тип виджета, который необходимо показать после удаления данного виджета.
     * @returns {WidgetsManager}
     */
    removeWidgetFromManager(widgetType, widgetTypeShowingAfterRemoving) {
        if(widgetType === this._currentWidget) {
            this._currentWidget = WidgetType.NONE;
        }

        this._widgetsMap.delete(widgetType);

        if(widgetTypeShowingAfterRemoving !== null && widgetTypeShowingAfterRemoving !== undefined) {
            this.setWidgetToViewport(widgetTypeShowingAfterRemoving);
        }

        return this;
    }

    /**
     * Инициализировать текущий виджет заново.
     */
    reloadCurrentWidget() {
        this._widgetsMap.get(this._currentWidget).reloadWidget();
    }

    /**
     * Показать виджет пользователю.
     * @param widgetType - тип виджета.
     * @returns {WidgetsManager}
     */
    setWidgetToViewport(widgetType) {
        if(this._widgetsMap.has(widgetType)) {
            this._widgetsMap.get(widgetType).reloadWidget();
            this._currentWidget = widgetType;
        }

        return this;
    }

    /**
     * Показать перекрывающий (оверлей) виджет пользователю поверх текущего виджета.
     * @param widgetType - тип виджета.
     * @returns {WidgetsManager}
     */
    addOverlayWidgetToViewport(widgetType) {
        if(this._widgetsMap.has(widgetType)) {
            this._widgetsMap.get(widgetType).reloadWidget();
            this._overlayWidget = widgetType;
        }

        return this;
    }

    /**
     * Отключить показ всех виджетов пользователю.
     * @returns {WidgetsManager}
     */
    removeAllWidgetsFromViewport() {
        this._currentWidget = WidgetType.NONE;
        this._overlayWidget = WidgetType.NONE;
        return this;
    }

    /**
     * Отключить показ оверлей виджета.
     * @returns {WidgetsManager}
     */
    removeOverlayWidgetFromViewport() {
        this._overlayWidget = WidgetType.NONE;
        return this;
    }

    /**
     * Отправить объект в виджет для его обработки.
     * @param processedObjects - объект
     */
    sendDataToProcessInWidget(processedObjects) {
        this._widgetsMap.get(this._currentWidget).processData(processedObjects);
    }

    /**
     * Получить объект из виджета.
     * @param widgetType - тип виджета.
     * @returns {*} - объект из виджета.
     */
    getDataFromWidget(widgetType) {
        return this._widgetsMap.get(widgetType).getData();
    }

    /**
     * Проверить существует ли данный виджет в менеджере.
     * @param widgetType - тип виджета.
     * @returns {boolean} - результат.
     */
    hasWidgetInManager(widgetType) {
        return this._widgetsMap.has(widgetType);
    }

    update() {
        if(this._overlayWidget === WidgetType.NONE) {
            this._widgetsMap.get(this._currentWidget).update();
        } else {
            this._widgetsMap.get(this._overlayWidget).update();
        }
    }

    draw() {
        this._widgetsMap.get(this._currentWidget).draw();

        if(this._overlayWidget !== WidgetType.NONE) {
            this._widgetsMap.get(this._overlayWidget).draw();
        }
    }
}
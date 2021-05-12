/**
 * Виджет главного меню игры.
 * Содержит кнопку начала игры, опций и рекордов, а так же логотип.
 */
class MenuWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.MENU, reloadFromDefaults, defaults);
        this._startGameButton = new Button(175, 305, 450, 60, "Start game", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.GAME_SELECT)});
        this._optionsButton = new Button(175, 415, 450, 60, "Options", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.OPTIONS)});
        this._recordsButton = new Button(175, 525, 450, 60, "Records", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.RECORDS)});
        this._logoImage = textureManager.getTexture(UI_Logo_Static);
        this.reloadWidget();
    }

    reloadWidget() {
        return super.reloadWidget();
    }

    processData(processedObjects) {
        return super.processData(processedObjects);
    }

    getData() {
        return super.getData();
    }

    update() {
        this._startGameButton.update();
        this._optionsButton.update();
        this._recordsButton.update();
    }

    draw() {
        image(this._logoImage, 175, 50);
        this._startGameButton.draw();
        this._optionsButton.draw();
        this._recordsButton.draw();
    }
}
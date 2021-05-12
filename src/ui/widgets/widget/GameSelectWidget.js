/**
 * Виджет выбора режима игры.
 * Позволяет выбрать режим игры (управление игроком или ИИ)
 */
class GameSelectWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.GAME_SELECT, reloadFromDefaults, defaults);
        this._gameSelectBanner = new Panel(175, 75, 450, 50, "Select mode", 24, FontPixelGeorgia, 0, "#dcdcdc", textureManager.getTexture(UI_Banner_Normal), null);

        this._startGameAIButton = new Button(175, 305, 450, 60, "Start game: AI", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {gameStatesManager.selectStateWithParameter(Info.GAME, {ai: true})});
        this._startGamePlayerButton = new Button(175, 415, 450, 60, "Start game: Player", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {gameStatesManager.selectStateWithParameter(Info.GAME, {ai: false})});

        this._backButton = new Button(175, 700, 450, 60, "Back", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.MENU)});

        this.reloadWidget();
    }

    reloadWidget() {
        return super.reloadWidget();
    }

    processData(processedObjects) {

    }

    getData() {

    }

    update() {
        this._gameSelectBanner.update();

        this._startGameAIButton.update();
        this._startGamePlayerButton.update();

        this._backButton.update();
    }

    draw() {
        this._gameSelectBanner.draw();

        this._startGameAIButton.draw();
        this._startGamePlayerButton.draw();

        this._backButton.draw();
    }
}
/**
 * Виджет меню во время паузы игры.
 * Отображает кнопки выхода в меню, опций и продолжения игры.
 */
class GamePauseWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.GAME_PAUSE, reloadFromDefaults, defaults);
        this.unPause = false;
        this._pauseBanner = new Panel(175, 75, 450, 50, "Pause", 24, FontPixelGeorgia, 0, "#dcdcdc", textureManager.getTexture(UI_Banner_Normal), null);

        this._resumeButton = new Button(175, 305, 450, 60, "Resume", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {this.unPause = true});
        this._optionsButton = new Button(175, 415, 450, 60, "Options", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.IN_GAME_OPTIONS)});
        this._exitButton = new Button(175, 525, 450, 60, "Exit", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {gameStatesManager.selectState(Info.MENU)});

        this.reloadWidget();
    }

    reloadWidget() {
        if(super.reloadWidget()) {
            this.unPause = false;
            return true;
        }

        return false;
    }

    processData(processedObjects) {
        if("unPause" in processedObjects) {
            this.unPause = processedObjects.unPause;
        }
    }

    getData() {
        return {unPause: this.unPause};
    }

    update() {
        this._pauseBanner.update();

        this._resumeButton.update();
        this._optionsButton.update();
        this._exitButton.update();
    }

    draw() {
        this._pauseBanner.draw();

        this._resumeButton.draw();
        this._optionsButton.draw();
        this._exitButton.draw();
    }
}
/**
 * Виджет окончания игры.
 * Отображает результат игры (выигрыш / проигрыш) и количество очков.
 */
class EndGameWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.END_GAME, reloadFromDefaults, defaults);
        this._message = "message" in defaults ? defaults.message : "You lose!";
        this._finalScore = "score" in defaults ? defaults.score : 0;
        this._resultPanel = new Panel(175, 200, 450, 450, null, null, null, null, null, textureManager.getTexture(UI_Panel_Simple), null);

        this._applyButton = new Button(175, 590, 450, 60, "Apply", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.removeAllWidgetsFromViewport(); widgetManager.removeWidgetFromManager(WidgetType.END_GAME); recordsManager.addRecord(defaults); recordsManager.updateRecords(); gameStatesManager.selectState(Info.MENU)});
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
        this._resultPanel.update();

        this._applyButton.update();
    }

    draw() {
        this._resultPanel.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(24);
        textAlign(CENTER, CENTER);
        text(this._message + "\n\n" + "Score: " + this._finalScore, 400, 420);

        this._applyButton.draw();
    }
}
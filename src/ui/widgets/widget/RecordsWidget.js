/**
 * Виджет рекордов.
 * Содержит панель рекордов на которой отмечены все рекорды с режимом игры и количеством очков.
 */
class RecordsWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.RECORDS, reloadFromDefaults, defaults);
        this._recordsBanner = new Panel(175, 75, 450, 50, "Records", 24, FontPixelGeorgia, 0, "#dcdcdc", textureManager.getTexture(UI_Banner_Normal), null);
        this._backgroundPanel = new Panel(175, 200, 450, 450, null, 0, null, 0, null, textureManager.getTexture(UI_Panel_Records), null);

        this._recordsList = [];

        this._recordPanel1 = null;
        this._recordPanel2 = null;
        this._recordPanel3 = null;
        this._recordPanel4 = null;

        this._backButton = new Button(175, 700, 450, 60, "Back", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {widgetManager.setWidgetToViewport(WidgetType.MENU)});
        this.reloadWidget();
    }

    reloadWidget() {
        if(super.reloadWidget()) {
            this._recordsList = recordsManager.getRecords();

            if (this._recordsList.length > 0 && this._recordsList[0]) {
                this._recordPanel1 = new Panel(200, 220, 200, 200, null, null, null, null, null, textureManager.getTexture(UI_Record_Entry), null);
            }

            if (this._recordsList.length > 1 && this._recordsList[1]) {
                this._recordPanel2 = new Panel(400, 220, 200, 200, null, null, null, null, null, textureManager.getTexture(UI_Record_Entry), null);
            }

            if (this._recordsList.length > 2 && this._recordsList[2]) {
                this._recordPanel3 = new Panel(200, 420, 200, 200, null, null, null, null, null, textureManager.getTexture(UI_Record_Entry), null);
            }

            if (this._recordsList.length > 3 && this._recordsList[3]) {
                this._recordPanel4 = new Panel(400, 420, 200, 200, null, null, null, null, null, textureManager.getTexture(UI_Record_Entry), null);
            }

            return true;
        }

        return false;
    }

    processData(processedObjects) {
        return super.processData(processedObjects);
    }

    getData() {
        return null;
    }

    update() {
        this._recordsBanner.update();
        this._backgroundPanel.update();

        if(this._recordPanel1) {
            this._recordPanel1.update();
        }

        if(this._recordPanel2) {
            this._recordPanel2.update();
        }

        if(this._recordPanel3) {
            this._recordPanel3.update();
        }

        if(this._recordPanel4) {
            this._recordPanel4.update();
        }

        this._backButton.update();
    }

    draw() {
        this._recordsBanner.draw();
        this._backgroundPanel.draw();

        if(this._recordPanel1) {
            this._recordPanel1.draw();
            fill("#282828");
            textFont(FontPixelGeorgia);
            textSize(18);
            textAlign(CENTER, CENTER);
            text("# 1\n\n" + RecordsManager.recordToString(this._recordsList[0]), 300, 320);
        }

        if(this._recordPanel2) {
            this._recordPanel2.draw();
            fill("#282828");
            textFont(FontPixelGeorgia);
            textSize(18);
            textAlign(CENTER, CENTER);
            text("# 2\n\n" + RecordsManager.recordToString(this._recordsList[1]), 500, 320);
        }

        if(this._recordPanel3) {
            this._recordPanel3.draw();
            fill("#282828");
            textFont(FontPixelGeorgia);
            textSize(18);
            textAlign(CENTER, CENTER);
            text("# 3\n\n" + RecordsManager.recordToString(this._recordsList[2]), 300, 520);
        }

        if(this._recordPanel4) {
            this._recordPanel4.draw();
            fill("#282828");
            textFont(FontPixelGeorgia);
            textSize(18);
            textAlign(CENTER, CENTER);
            text("# 4\n\n" + RecordsManager.recordToString(this._recordsList[3]), 500, 520);
        }

        this._backButton.draw();
    }
}
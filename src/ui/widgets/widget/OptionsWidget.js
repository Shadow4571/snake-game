/**
 * Виджет опций.
 * Содержит кнопки для настройки управления и бар для выбора уровня звука.
 */
class OptionsWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.OPTIONS, reloadFromDefaults, defaults);
        this._optionsBanner = new Panel(175, 75, 450, 50, "Options", 24, FontPixelGeorgia, 0, "#dcdcdc", textureManager.getTexture(UI_Banner_Normal), null);
        this._backgroundPanel = new Panel(175, 200, 450, 450, null, 0, null, 0, null, textureManager.getTexture(UI_Panel_Normal), null);

        this._selectButtonUP = null;
        this._selectButtonDOWN = null;
        this._selectButtonLEFT = null;
        this._selectButtonRIGHT = null;

        this._soundBar = null;
        this._soundLowerButton = new Button(220, 540,  60, 60, "<", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {this._soundBar.stepBackward(); SOUND_VOLUME = this._soundBar.value; soundManager.setMasterVolume(SOUND_VOLUME)});
        this._soundHigherButton = new Button(520, 540, 60, 60, ">", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {this._soundBar.stepForward(); SOUND_VOLUME = this._soundBar.value; soundManager.setMasterVolume(SOUND_VOLUME)});

        this._applyButton = new Button(175, 700, 450, 60, "Apply", 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_MenuButton_Normal), textureManager.getTexture(UI_MenuButton_Hovered), textureManager.getTexture(UI_MenuButton_Pressed), () => {saveTriggerSetToCookies(triggerSet.getTriggersSet()); saveSoundConfigToCookies(this._soundBar.value); defaults.delegate.call();});
        this.reloadWidget();
    }

    reloadWidget() {
        if(super.reloadWidget()) {
            this._soundBar = new Bar(300, 540, 200, 60, 0.1, SOUND_VOLUME, textureManager.getTexture(UI_Bar_Simple_Normal), textureManager.getTexture(UI_Bar_Simple_Overlay));
            this._selectButtonUP = new Button(320, 285, 60, 60, getKeyCharFromKeyCode(triggerSet.getKeyCodeFromTrigger(Trigger.UP)).toUpperCase(), 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {
                widgetManager.addWidgetToManager(WidgetType.CHANGE_KEY, new ChangeKeyWidget(true, {trigger: Trigger.UP})).addOverlayWidgetToViewport(WidgetType.CHANGE_KEY)
            });
            this._selectButtonDOWN = new Button(520, 285, 60, 60, getKeyCharFromKeyCode(triggerSet.getKeyCodeFromTrigger(Trigger.DOWN)).toUpperCase(), 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {
                widgetManager.addWidgetToManager(WidgetType.CHANGE_KEY, new ChangeKeyWidget(true, {trigger: Trigger.DOWN})).addOverlayWidgetToViewport(WidgetType.CHANGE_KEY)
            });
            this._selectButtonLEFT = new Button(320, 370, 60, 60, getKeyCharFromKeyCode(triggerSet.getKeyCodeFromTrigger(Trigger.LEFT)).toUpperCase(), 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {
                widgetManager.addWidgetToManager(WidgetType.CHANGE_KEY, new ChangeKeyWidget(true, {trigger: Trigger.LEFT})).addOverlayWidgetToViewport(WidgetType.CHANGE_KEY)
            });
            this._selectButtonRIGHT = new Button(520, 370, 60, 60, getKeyCharFromKeyCode(triggerSet.getKeyCodeFromTrigger(Trigger.RIGHT)).toUpperCase(), 24, FontPixelGeorgia, "#dcdcdc", "#dcdcdc", "#b4b4b4", textureManager.getTexture(UI_ButtonSmall_Normal), textureManager.getTexture(UI_ButtonSmall_Hovered), textureManager.getTexture(UI_ButtonSmall_Pressed), () => {
                widgetManager.addWidgetToManager(WidgetType.CHANGE_KEY, new ChangeKeyWidget(true, {trigger: Trigger.RIGHT})).addOverlayWidgetToViewport(WidgetType.CHANGE_KEY)
            });

            return true;
        }

        return false;
    }

    processData(processedObjects) {
        return super.processData(processedObjects);
    }

    getData() {
        return super.getData();
    }

    update() {
        this._selectButtonUP.update();
        this._selectButtonDOWN.update();
        this._selectButtonLEFT.update();
        this._selectButtonRIGHT.update();
        this._applyButton.update();

        this._soundBar.update();
        this._soundLowerButton.update();
        this._soundHigherButton.update();
    }

    draw() {
        this._optionsBanner.draw();
        this._backgroundPanel.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("--- Controls ---", 400, 255);

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(LEFT, CENTER);
        text("Up:", 220, 315);

        this._selectButtonUP.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(LEFT, CENTER);
        text("Down:", 420, 315);

        this._selectButtonDOWN.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(LEFT, CENTER);
        text("Left:", 220, 400);

        this._selectButtonLEFT.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(LEFT, CENTER);
        text("Right:", 420, 400);

        this._selectButtonRIGHT.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("--- Sound volume ---", 400, 510);

        this._soundBar.draw();
        this._soundLowerButton.draw();
        this._soundHigherButton.draw();

        this._applyButton.draw();
    }
}
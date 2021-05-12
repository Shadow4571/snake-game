/**
 * Виджет смены клавиши.
 * Отображается при смене клавиши управления.
 */
class ChangeKeyWidget extends IWidget {
    constructor(reloadFromDefaults, defaults) {
        super(WidgetType.CHANGE_KEY, reloadFromDefaults, defaults);
        this._backgroundPanel = new Panel(220, 285, 360, 315, null, null, null, null, null, textureManager.getTexture(UI_Panel_Simple), null);
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
        this._backgroundPanel.update();

        let pressedKey = triggerSet.CurrentPressedKey;

        if(pressedKey.key !== null || triggerSet.LMB || triggerSet.RMB) {
            if(pressedKey.keyCode !== 27 && !triggerSet.LMB && !triggerSet.RMB) {
                triggerSet.setTriggerKey(pressedKey.keyCode, this.defaults.trigger);
            }

            widgetManager.reloadCurrentWidget();
            widgetManager.removeWidgetFromManager(WidgetType.CHANGE_KEY);
            widgetManager.removeOverlayWidgetFromViewport();
        }
    }

    draw() {
        this._backgroundPanel.draw();

        fill("#dcdcdc");
        textFont(FontPixelGeorgia);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("Press any key.\n\nFirst key pressed will be\nset for this action.\n\nIf you want to cancel\npress Esc or mouse button.", 400, 425);
    }
}
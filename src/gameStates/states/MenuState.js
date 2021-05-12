/**
 * Класс игрового состояния меню.
 * Отображает на экран виджет меню и включает проигрывание музыки из меню.
 * Так же отображает изображение на заднем плане с игрой змейки.
 */
class MenuState extends IGameState {
    constructor(stateInfo) {
        super(stateInfo);
        this._background = null;
        this.init();
        console.log("LOAD CLASS: " + this.constructor.name);
    }

    init(initObject) {
        super.init();
        soundManager.stopAllSound();
        widgetManager.setWidgetToViewport(WidgetType.MENU);
        this._background = textureManager.getTexture(UI_Background);
        soundManager.playSound(Musics.MENU);
    }

    update() {
        super.update();
    }

    draw() {
        image(this._background, 0, 0, CANVAS_SIZE.X, CANVAS_SIZE.Y);
        super.draw();
    }
}
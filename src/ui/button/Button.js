/**
 * Класс кнопки пользовательского интерфейса.
 */
class Button {
    /**
     * @param x - координата x.
     * @param y - координата y.
     * @param w - ширина.
     * @param h - высота.
     * @param text - текст кнопки.
     * @param textSize - размер текста.
     * @param textFont - шрифт текста.
     * @param textColorNormal - нормальный цвет текста.
     * @param textColorHover - цвет текста при наведении.
     * @param textColorPressed - цвет текста при нажатии.
     * @param imageNormal - нормальная текстура.
     * @param imageHover - текстура при наведении.
     * @param imagePressed - текстура при наложении.
     * @param pressedDelegate - функция при нажатии на кнопку.
     */
    constructor(x, y, w, h, text, textSize, textFont, textColorNormal, textColorHover, textColorPressed, imageNormal, imageHover, imagePressed, pressedDelegate) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;

        this._text = text;
        this._textPosition = {x: this._x + this._width / 2, y: this._y + this._height / 2};
        this._textSize = textSize;
        this._textFont = textFont;
        this._textColors = [textColorNormal, textColorHover, textColorPressed];
        this._textIndex = 0;

        this._images = [imageNormal, imageHover, imagePressed];
        this._imageIndex = 0;

        this._lock = false;
        this._isPlayPressed = false;
        this._pressedDelegate = pressedDelegate !== null && pressedDelegate !== undefined && pressedDelegate instanceof Function ? pressedDelegate : function () {};
    }

    /**
     * Функция выполняется при отведении мышки от кнопки.
     * @private
     */
    _onOutside() {
        this._lock = false;
        this._imageIndex = 0;
        this._textIndex = 0;
        this._isPlayPressed = false;
        soundManager.resetCallableElementFromCurrent(this);
    }

    /**
     * Функция выполняется при наведении мышки на кнопку.
     * @private
     */
    _onHover() {
        if(!this._lock) {
            this._imageIndex = 1;
            this._textIndex = 1;
            this._isPlayPressed = false;
            soundManager.playSoundOnce(Sounds.BUTTON_HOVERED, this);
        }
    }

    /**
     * Функция выполняется при нажатии но кнопку. Данная кнопка отмечается как выбранная.
     * @private
     */
    _onPressed() {
        this._lock = true;
        this._imageIndex = 2;
        this._textIndex = 2;

        if(!this._isPlayPressed) {
            this._isPlayPressed = true;
            soundManager.playSound(Sounds.BUTTON_PRESSED);
        }
    }

    /**
     * Функция выполняется, когда кнопка мыши отпущена и кнопка омечена как выбранная.
     * Запускается действие из делегата.
     * @private
     */
    _onRelease() {
        this._lock = false;
        soundManager.playSound(Sounds.BUTTON_RELEASED);
        this._pressedDelegate.call();
    }

    update() {
        if(mouseX >= this._x && mouseY >= this._y && mouseX <= this._x + this._width && mouseY <= this._y + this._height) {
            this._onHover();

            if(triggerSet.LMB) {
                this._onPressed();
            } else if(!triggerSet.LMB && this._lock) {
                this._onRelease();
            }
        } else {
            this._onOutside();
        }
    }

    draw() {
        image(this._images[this._imageIndex], this._x, this._y, this._width, this._height);

        fill(this._textColors[this._textIndex]);
        textFont(this._textFont);
        textSize(this._textSize);
        textAlign(CENTER, CENTER);
        text(this._text, this._textPosition.x, (this._lock ? this._textPosition.y + 2 : this._textPosition.y));
    }
}
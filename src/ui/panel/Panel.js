/**
 * Класс панели. Простая панель с фоном, есть возможность вывести на пенель текст, либо вывести пустую панель.
 */
class Panel {
    /**
     * @param x - координата x.
     * @param y - координата y.
     * @param w - ширина.
     * @param h - высота.
     * @param text - текст панели (необязательно).
     * @param textSize - размер текста (необязательно).
     * @param textFont - шрифт текста (необязательно).
     * @param textPadding - отступ текста (необязательно).
     * @param textColor - цвет текста (необязательно).
     * @param texture - текстура панели.
     * @param delegate - делегат панели (необязательно).
     */
    constructor(x, y, w, h, text, textSize, textFont, textPadding, textColor, texture, delegate) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this._textPosition = {x: x + w / 2, y: y + h / 2};
        this._textRows = this._checkAndGetCorrectMessages(text);
        this._drawText = this._textRows.length > 0;
        this._textSize = textSize;
        this._textFont = textFont;
        this._textPadding = textPadding;
        this._textColor = textColor;
        this._texture = texture;
        this._delegate = delegate instanceof Function ? delegate : () => {};
    }

    /**
     * Форматировать размер текста под размеры панели.
     * @param message - текст.
     * @returns {[]} - массив строк.
     * @private
     */
    _checkAndGetCorrectMessages(message) {
        let result = [];

        if(message === null || message === undefined || !message instanceof String) {
            return result;
        }

        let maxLength = Math.round((this._width / this._textSize - this._textPadding / this._width) * 1.2);
        let splitMessages = message.split("\n");
        for (let splitMessage of splitMessages) {
            if (splitMessage.length > maxLength) {
                let splitCount = Math.ceil(splitMessage.length / maxLength);
                for (let i = 0; i < splitCount; i++) {
                    result.push(splitMessage.substr(i * maxLength, maxLength).trim());
                }
            } else {
                result.push(splitMessage);
            }
        }

        return result;
    }

    update() {
        this._delegate.call();
    }

    draw() {
        image(this._texture, this._x, this._y, this._width, this._height);
        if(this._drawText) {
            fill(this._textColor);
            textFont(this._textFont);
            textSize(this._textSize);
            textAlign(CENTER, CENTER);


            for (let i = 0; i < this._textRows.length; i++) {
                if (this._y + i * this._textPadding + i * this._textSize > this._y + this._height) {
                    break;
                }

                text(this._textRows[i], this._textPosition.x + this._textPadding, this._textPosition.y + i * this._textPadding + i * this._textSize);
            }
        }
    }
}
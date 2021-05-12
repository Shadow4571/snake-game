/**
 * Класс панели сообщения для отображения ошибки, либо критической информации.
 */
class MessageBox {
    /**
     * @param x - координата x.
     * @param y - координата y;
     * @param w - ширина.
     * @param h - высота.
     * @param color - цвет основной панели.
     * @param headColor - цвет панели заголовка.
     * @param headText - текст заголовка.
     * @param headTextSize - размер текста заголовка.
     * @param headHeight - высота заголовка.
     * @param textColor - цвет текста.
     * @param textAlign - выравнивание текста.
     * @param textPadding - отступ текста.
     * @param textSize - размер текста.
     * @param messages - текст основной панели.
     * @param button - кнопка, которая будет встроена в панель.
     */
    constructor(x, y, w, h, color, headColor, headText, headTextSize, headHeight, textColor, textAlign, textPadding, textSize, messages, button) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this._color = color;
        this._headColor = headColor;
        this._headText = null;
        this._headTextSize = headTextSize;
        this._headHeight = headHeight;
        this._textColor = textColor;
        this._textAlign = textAlign;
        this._textPadding = textPadding;
        this._textSize = textSize;
        this._messages = this._checkAndGetCorrectMessages(messages);
        this._button = button instanceof Button ? button : null;
        this._isDrawHead = headText.__proto__ === String.prototype && headText.length !== 0;

        if(!this._isDrawHead) {
            this._headHeight = 0;
        } else {
            this._headText = this._checkAndGetCorrectHeadText(headText);
        }

        if(this._button !== null) {
            this._button.setLocalPosition(this._x, this._y, this._width, this._height);
        }
    }

    /**
     * Функция форматирует сообщение под ширину и высоту панели.
     * @param messages - сообщения.
     * @returns {[]} - массив отформатированных сообщений.
     * @private
     */
    _checkAndGetCorrectMessages(messages) {
        let result = [];

        let maxLength = Math.round((this._width / this._textSize - this._textPadding / this._width) * 1.3);
        for(let preMessage of messages) {
            let splitMessages = preMessage.split("\n");
            for(let message of splitMessages) {
                if (message.length > maxLength) {
                    let splitCount = Math.ceil(message.length / maxLength);
                    for (let i = 0; i < splitCount; i++) {
                        result.push(message.substr(i * maxLength, maxLength).trim());
                    }
                } else {
                    result.push(message);
                }
            }
        }

        return result;
    }

    /**
     * Форматирует текст заголовка под корректный размер.
     * @param text - текст.
     * @returns {string} - корректный текст.
     * @private
     */
    _checkAndGetCorrectHeadText(text) {
        let maxLength = Math.round(this._width / this._headTextSize) + 5;

        return maxLength > text.length ? text : text.substr(0, maxLength) + "...";
    }

    update() {
        if(this._button !== null) {
            this._button.update();
        }
    }

    _drawHead() {
        fill(this._headColor);
        rect(this._x, this._y, this._width, this._headHeight);
        fill(this._textColor);
        textSize(this._headTextSize);
        textAlign(CENTER, CENTER);
        text(this._headText, this._x + this._width / 2, this._y + this._headHeight / 2);
    }

    _drawMessage(x, y, i, message) {
        if (y + i * this._textPadding + i * this._textSize > this._height) {
            return;
        }

        text(message, x + this._textPadding, y + i * this._textPadding + i * this._textSize);
    }

    draw() {
        fill(this._color);
        rect(this._x, this._y, this._width, this._height);

        if(this._isDrawHead) {
            this._drawHead();
        }

        fill(this._textColor);
        textSize(this._textSize);
        textAlign(this._textAlign, TOP);
        for(let i = 0; i < this._messages.length; i++) {
            this._drawMessage(this._x, this._y + this._headHeight + this._textSize, i, this._messages[i]);
        }

        if(this._button !== null) {
            this._button.draw();
        }
    }
}
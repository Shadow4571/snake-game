/**
 * Класс реализующий полоску прогресса с шагом значения и значением по умолчанию.
 */
class Bar {
    /**
     * @param x - координата x.
     * @param y - координата y.
     * @param w - ширина.
     * @param h - высота.
     * @param stepValue - величина шага.
     * @param defaultValue - значение по умолчанию.
     * @param texture - текустура подложки.
     * @param overlayTexture - текстура полоски прогресса
     */
    constructor(x, y, w, h, stepValue, defaultValue, texture, overlayTexture) {
        this._x = x;
        this._y = y;
        this._width = w;
        this._height = h;
        this._min = 0;
        this._max = 1;
        this._step = stepValue;
        this._stepCount = this._max / stepValue;
        this._index = 0;
        this._oldIndex = 0;
        this._value = 0;
        this.setValue(defaultValue);
        this._texture = texture;
        this._overlayTexture = overlayTexture;
        this._overlayTexture.loadPixels();
        this._currentOverlayTexture = null;
        this._cropOverlayTexture();
    }

    /**
     * Обрезает полоску прогресса до необходимого размера.
     * @private
     */
    _cropOverlayTexture() {
        if(this._value !== 0) {
            this._currentOverlayTexture = createImage(((this._width * this._value) ^ 0) + 1, this._height);
            this._currentOverlayTexture.loadPixels();

            for (let x = 0; x < (this._width * this._value) ^ 0; x++) {
                for (let y = 0; y < this._height; y++) {
                    this._currentOverlayTexture.set(x, y, this._overlayTexture.get(x, y));
                }
            }

            this._currentOverlayTexture.updatePixels();
        } else {
            this._currentOverlayTexture = null;
        }
    }

    /**
     * Вернуть значение из полоски прогресса с учетом шага.
     * @returns {number} - значение полоски прогресса.
     */
    get value() {
        return this._value;
    }

    /**
     * Установить значение полоски прогресса с учетом шага.
     * @param value - значение полоски.
     */
    setValue(value) {
        if (value < 0) {
            value = this._min;
        }

        if(value > 1) {
            value = this._max;
        }

        this._index = Math.round(this._stepCount * value);
        this._value = this._index * this._step;
    }

    /**
     * Выполнить шаг вперед, добавив к текущему значению, значение шага.
     */
    stepForward() {
        this.setValue(this._value + this._step);
    }

    /**
     * Выполнить шаг назад, отняв от текущего значения, значение шага.
     */
    stepBackward() {
        this.setValue(this._value - this._step);
    }

    update() {
        if(this._oldIndex !== this._index) {
            this._cropOverlayTexture();
            this._oldIndex = this._index;
        }
    }

    draw() {
        image(this._texture, this._x, this._y, this._width, this._height);
        if(this._currentOverlayTexture !== null) {
            image(this._currentOverlayTexture, this._x, this._y);
        }
    }
}